export async function GET() {
  return Response.json({
    pages: [
      {
        path: '/',
        title: 'Home',
        priority: 1.0,
      },
      {
        path: '/about',
        title: 'About Us',
        priority: 0.8,
      },
      {
        path: '/services',
        title: 'Services',
        priority: 0.9,
        children: [
          {
            path: '/services/web-design',
            title: 'Web Design',
            priority: 0.7,
          },
          {
            path: '/services/marketing',
            title: 'Marketing',
            priority: 0.7,
          },
        ],
      },
      {
        path: '/contact',
        title: 'Contact',
        priority: 0.6,
      },
    ],
  });
}
