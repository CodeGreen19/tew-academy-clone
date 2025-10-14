type NavItem = {
  title: string;
  url: string;
  isActive?: boolean;
};

type NavSection = {
  title: string;
  items?: NavItem[];
};

export type NavData = {
  navMain: NavSection[];
};
