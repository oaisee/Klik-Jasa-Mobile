
import React from 'react';

interface OnboardingSlideProps {
  title: string;
  description: string;
  illustration: React.ReactNode;
}

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  title,
  description,
  illustration,
}) => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-10 h-full">
      <div className="mb-8 w-48 h-48 flex items-center justify-center">
        {illustration}
      </div>
      <h2 className="text-2xl font-bold text-klikjasa-purple mb-4 text-center">
        {title}
      </h2>
      <p className="text-center text-gray-600 mb-8">
        {description}
      </p>
    </div>
  );
};

export default OnboardingSlide;
