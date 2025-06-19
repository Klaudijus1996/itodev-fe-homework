import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { EventsIndexDataTable } from '@/features/events/ui/events-index-data-table';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function Home() {
  return (
    <Section>
      <Container className={'flex max-w-2xl flex-col'}>
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
        <EventsIndexDataTable />
      </Container>
    </Section>
  );
}
