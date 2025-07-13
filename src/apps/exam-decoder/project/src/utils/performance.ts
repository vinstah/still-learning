interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: Date;
  context?: string;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers(): void {
    // Observe navigation timing
    if ('PerformanceObserver' in window) {
      try {
        const navObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
              const navEntry = entry as PerformanceNavigationTiming;
              this.recordMetric('page_load_time', navEntry.loadEventEnd - navEntry.fetchStart);
              this.recordMetric('dom_content_loaded', navEntry.domContentLoadedEventEnd - navEntry.fetchStart);
              this.recordMetric('first_paint', navEntry.loadEventEnd - navEntry.fetchStart);
            }
          }
        });
        navObserver.observe({ entryTypes: ['navigation'] });
        this.observers.push(navObserver);
      } catch (error) {
        console.warn('Navigation timing observer not supported:', error);
      }

      // Observe resource timing
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'resource') {
              const resourceEntry = entry as PerformanceResourceTiming;
              if (resourceEntry.duration > 1000) { // Log slow resources
                this.recordMetric('slow_resource', resourceEntry.duration, resourceEntry.name);
              }
            }
          }
        });
        resourceObserver.observe({ entryTypes: ['resource'] });
        this.observers.push(resourceObserver);
      } catch (error) {
        console.warn('Resource timing observer not supported:', error);
      }

      // Observe largest contentful paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.recordMetric('largest_contentful_paint', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (error) {
        console.warn('LCP observer not supported:', error);
      }
    }
  }

  recordMetric(name: string, value: number, context?: string): void {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: new Date(),
      context
    };

    this.metrics.push(metric);

    // Keep only last 1000 metrics
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }

    // Log performance issues
    if (this.isPerformanceIssue(name, value)) {
      console.warn(`Performance issue detected: ${name} = ${value}ms`, context);
    }
  }

  private isPerformanceIssue(name: string, value: number): boolean {
    const thresholds: Record<string, number> = {
      page_load_time: 3000,
      dom_content_loaded: 2000,
      largest_contentful_paint: 2500,
      slow_resource: 2000,
      quiz_render_time: 500,
      card_render_time: 300
    };

    return value > (thresholds[name] || Infinity);
  }

  measureFunction<T>(name: string, fn: () => T): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    this.recordMetric(name, end - start);
    return result;
  }

  async measureAsyncFunction<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    this.recordMetric(name, end - start);
    return result;
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  getAverageMetric(name: string): number {
    const relevantMetrics = this.metrics.filter(m => m.name === name);
    if (relevantMetrics.length === 0) return 0;
    
    const sum = relevantMetrics.reduce((acc, m) => acc + m.value, 0);
    return sum / relevantMetrics.length;
  }

  generateReport(): any {
    const metricsByName = this.groupMetricsByName();
    
    return {
      totalMetrics: this.metrics.length,
      averages: Object.entries(metricsByName).reduce((acc, [name, metrics]) => {
        acc[name] = metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length;
        return acc;
      }, {} as Record<string, number>),
      issues: this.metrics.filter(m => this.isPerformanceIssue(m.name, m.value)),
      timestamp: new Date()
    };
  }

  private groupMetricsByName(): Record<string, PerformanceMetric[]> {
    return this.metrics.reduce((acc, metric) => {
      if (!acc[metric.name]) {
        acc[metric.name] = [];
      }
      acc[metric.name].push(metric);
      return acc;
    }, {} as Record<string, PerformanceMetric[]>);
  }

  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics = [];
  }
}

export const performanceMonitor = new PerformanceMonitor();

// React component performance wrapper
export function withPerformanceTracking<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) {
  return function PerformanceTrackedComponent(props: P) {
    const renderStart = performance.now();
    
    React.useEffect(() => {
      const renderEnd = performance.now();
      performanceMonitor.recordMetric(
        `${componentName}_render_time`,
        renderEnd - renderStart,
        componentName
      );
    });

    return React.createElement(Component, props);
  };
}