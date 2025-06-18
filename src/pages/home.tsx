import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { EventsIndexDataTable } from '@/features/events/ui/events-index-data-table';

export default function Home() {
  return (
    <Section>
      <Container className={'flex max-w-2xl flex-col gap-6 md:gap-[6.5rem]'}>
        <EventsIndexDataTable />
      </Container>
    </Section>
  );
}
