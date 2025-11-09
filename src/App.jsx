import React from 'react';
import HorizontalScroller from './components/HorizontalScroller';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsGameSection from './components/SkillsGameSection';
import EducationSection from './components/EducationSection';

export default function App() {
  return (
    <HorizontalScroller>
      <HeroSection />
      <ProjectsSection />
      <SkillsGameSection />
      <EducationSection />
    </HorizontalScroller>
  );
}
