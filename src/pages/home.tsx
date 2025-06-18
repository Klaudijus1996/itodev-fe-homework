import React from 'react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Section } from '@/components/layout/section';
import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Home() {
  return (
    <Section>
      <Container className={'flex max-w-2xl flex-col gap-6 md:gap-[6.5rem]'}>Hi mom!</Container>
    </Section>
  );
}
