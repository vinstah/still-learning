import React from 'react';
import { BadgeShowcase } from '../BadgeShowcase';
import { Certificate } from '../Certificate';
import { Badge } from '../../types/user';

interface BadgesViewProps {
  badges: Badge[];
  showCertificate: boolean;
  userName: string;
  accuracy: number;
  isDark: boolean;
  onCertificateDownload: () => void;
  onCertificateShare: () => void;
}

export const BadgesView: React.FC<BadgesViewProps> = ({
  badges,
  showCertificate,
  userName,
  accuracy,
  isDark,
  onCertificateDownload,
  onCertificateShare
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <BadgeShowcase badges={badges} isDark={isDark} />
      
      {showCertificate && (
        <Certificate
          studentName={userName}
          courseName="Physics Fundamentals"
          completionDate={new Date().toLocaleDateString()}
          accuracy={accuracy}
          isDark={isDark}
          onDownload={onCertificateDownload}
          onShare={onCertificateShare}
        />
      )}
    </div>
  );
};