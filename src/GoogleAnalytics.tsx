import ReactGA from 'react-ga';

export const initGA = (trackingID: string) => {
  ReactGA.initialize(trackingID);
};

export const trackPageView = (page: string) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};
