interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  userId?: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private isEnabled: boolean = true;

  constructor() {
    // Check if analytics is enabled (GDPR compliance)
    this.isEnabled = this.getConsentStatus();
  }

  private getConsentStatus(): boolean {
    try {
      return localStorage.getItem('analytics-consent') === 'true';
    } catch {
      return false;
    }
  }

  setConsent(consent: boolean): void {
    this.isEnabled = consent;
    try {
      localStorage.setItem('analytics-consent', consent.toString());
    } catch (error) {
      console.error('Failed to save analytics consent:', error);
    }
  }

  track(event: Omit<AnalyticsEvent, 'timestamp'>): void {
    if (!this.isEnabled) return;

    const analyticsEvent: AnalyticsEvent = {
      ...event,
      timestamp: new Date()
    };

    this.events.push(analyticsEvent);

    // In production, send to analytics service
    this.sendToAnalyticsService(analyticsEvent);

    // Keep only last 1000 events in memory
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000);
    }
  }

  // Learning-specific tracking methods
  trackQuizStart(cardId: string, userId?: string): void {
    this.track({
      event: 'quiz_start',
      category: 'learning',
      action: 'start_quiz',
      label: cardId,
      userId,
      metadata: { cardId }
    });
  }

  trackQuizComplete(cardId: string, score: number, timeSpent: number, userId?: string): void {
    this.track({
      event: 'quiz_complete',
      category: 'learning',
      action: 'complete_quiz',
      label: cardId,
      value: score,
      userId,
      metadata: { cardId, score, timeSpent }
    });
  }

  trackCardView(cardId: string, userId?: string): void {
    this.track({
      event: 'card_view',
      category: 'content',
      action: 'view_card',
      label: cardId,
      userId,
      metadata: { cardId }
    });
  }

  trackHintUsed(questionId: string, hintId: string, userId?: string): void {
    this.track({
      event: 'hint_used',
      category: 'learning',
      action: 'use_hint',
      label: questionId,
      userId,
      metadata: { questionId, hintId }
    });
  }

  trackError(error: string, context?: string, userId?: string): void {
    this.track({
      event: 'error',
      category: 'system',
      action: 'error_occurred',
      label: error,
      userId,
      metadata: { error, context }
    });
  }

  trackPerformance(metric: string, value: number, context?: string): void {
    this.track({
      event: 'performance',
      category: 'system',
      action: 'performance_metric',
      label: metric,
      value,
      metadata: { metric, context }
    });
  }

  private sendToAnalyticsService(event: AnalyticsEvent): void {
    // In production, implement actual analytics service integration
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }

    // Example: Send to Google Analytics, Mixpanel, etc.
    // gtag('event', event.action, {
    //   event_category: event.category,
    //   event_label: event.label,
    //   value: event.value
    // });
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  generateReport(startDate: Date, endDate: Date): any {
    const filteredEvents = this.events.filter(
      event => event.timestamp >= startDate && event.timestamp <= endDate
    );

    return {
      totalEvents: filteredEvents.length,
      eventsByCategory: this.groupBy(filteredEvents, 'category'),
      eventsByAction: this.groupBy(filteredEvents, 'action'),
      uniqueUsers: new Set(filteredEvents.map(e => e.userId).filter(Boolean)).size,
      timeRange: { startDate, endDate }
    };
  }

  private groupBy<T>(array: T[], key: keyof T): Record<string, number> {
    return array.reduce((acc, item) => {
      const value = String(item[key]);
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
}

export const analytics = new AnalyticsService();