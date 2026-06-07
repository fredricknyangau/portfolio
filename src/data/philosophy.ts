export interface PhilosophyPrinciple {
  index: string;
  title: string;
  body: string;
}

export const philosophyPrinciples: PhilosophyPrinciple[] = [
  {
    index: '01',
    title: 'Start with the database.',
    body:
      'Schema design is the first constraint. I model the data before writing any application code. A poorly designed schema will outlive any framework decision you make on top of it.',
  },
  {
    index: '02',
    title: 'Design for failure early.',
    body:
      'Webhooks fail. Networks drop. External APIs return unexpected status codes. I treat the failure path as a first-class feature, not an afterthought - retry logic, idempotency keys, and error states belong in the initial design.',
  },
  {
    index: '03',
    title: 'Prefer modular simplicity.',
    body:
      'A modular monolith with clean domain boundaries is more maintainable than a distributed system you are not ready to operate. Complexity should be earned, not assumed.',
  },
  {
    index: '04',
    title: 'Ship production-ready systems.',
    body:
      'Every project I build runs in production with real users. That means proper migrations, environment configs, error handling, and deployments - not just local prototypes that work on localhost.',
  },
  {
    index: '05',
    title: 'Prioritize maintainability.',
    body:
      'Code is read far more than it is written. I use typed schemas, named queries, and numbered migrations so that the next engineer - or me in six months - can understand the system without reverse-engineering it.',
  },
];
