import type { Feature } from './types';
import type { AdButlerConfig } from 'types/client/adButlerConfig';
import type { AdBannerProviders } from 'types/client/adProviders';

const title = 'Banner ads';

type AdsBannerFeatureProviderPayload = {
  provider: Exclude<AdBannerProviders, 'adbutler' | 'none'>;
} | {
  provider: 'adbutler';
  adButler: {
    config: {
      desktop: AdButlerConfig;
      mobile: AdButlerConfig;
    };
  };
} | {
  provider: Exclude<AdBannerProviders, 'adbutler' | 'none'>;
  additionalProvider: 'adbutler';
  adButler: {
    config: {
      desktop: AdButlerConfig;
      mobile: AdButlerConfig;
    };
  };
};

type AdsBannerFeaturePayload = AdsBannerFeatureProviderPayload & {
  isSpecifyEnabled: boolean;
};

const config: Feature<AdsBannerFeaturePayload> = Object.freeze({
  title,
  isEnabled: false,
});

export default config;
