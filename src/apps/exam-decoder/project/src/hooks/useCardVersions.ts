import { useState, useCallback } from 'react';
import { LearningCard, CardVersion, CardContent } from '../types';

export function useCardVersions(card: LearningCard) {
  const [versions, setVersions] = useState<CardVersion[]>(card.versions || []);

  const saveVersion = useCallback((content: CardContent, changes: string) => {
    const newVersion: CardVersion = {
      version: card.version + 1,
      timestamp: new Date(),
      changes,
      content
    };

    setVersions(prev => [...prev, newVersion]);
    return newVersion;
  }, [card.version]);

  const rollbackToVersion = useCallback((version: number) => {
    const targetVersion = versions.find(v => v.version === version);
    return targetVersion?.content || null;
  }, [versions]);

  const getVersionHistory = useCallback(() => {
    return versions.sort((a, b) => b.version - a.version);
  }, [versions]);

  return {
    versions,
    saveVersion,
    rollbackToVersion,
    getVersionHistory
  };
}