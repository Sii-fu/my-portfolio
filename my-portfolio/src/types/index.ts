export type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
};

export type HeaderProps = {
  title: string;
  links: Array<{ label: string; url: string }>;
};