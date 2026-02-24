import blogHero from "@/assets/images/blogImg1.png";
import blogHero2 from "@/assets/images/blogImg2.png";

export const BLOG_POSTS = [
  {
    id: 1,
    slug: "introducing-plan-b-chain",
    title: "Introducing Plan B Chain",
    description: "Overview of Plan B Chain and its mission.",
    category: ["Blockchain", "Trends"],
    image: blogHero,
    categoryImage: blogHero,
    timeToRead: "5 min read",
    date_created: "2025-01-10T12:00:00Z",
    content: `
      <h1>Introducing Plan B Chain</h1>
      <p>
        Plan B Chain is designed to provide scalable, secure, and user-friendly blockchain infrastructure
        for builders, institutions, and DeFi users.
      </p>
      <h2>Why Plan B?</h2>
      <p>
        It combines high performance with a developer-focused ecosystem, making it easier to launch and scale
        applications without compromising on security.
      </p>
      <h3>Next steps</h3>
      <p>
        Explore our documentation and follow our updates to stay informed about upcoming releases and features.
      </p>
    `,
  },
  {
    id: 2,
    slug: "defi-on-plan-b",
    title: "DeFi on Plan B",
    description: "How Plan B enables new DeFi use cases.",
    category: ["DeFi"],
    image: blogHero2,
    categoryImage: blogHero2,
    timeToRead: "7 min read",
    date_created: "2025-01-20T12:00:00Z",
    content: `
      <h1>DeFi on Plan B</h1>
      <p>
        Plan B Chain unlocks new DeFi primitives by offering low fees, fast finality, and a robust security model.
      </p>
      <h2>Key benefits</h2>
      <p>
        Builders can focus on product experience while relying on predictable performance and tooling.
      </p>
      <h3>Build with us</h3>
      <p>
        Join the ecosystem, experiment with smart contracts, and help define the future of decentralized finance.
      </p>
    `,
  },
];
