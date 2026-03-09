import type { Feature } from './types';
import type { AdTextProviders } from 'types/client/adProviders';

const title = 'Text ads';

interface SevioConfig {
  readonly zone: string;
  readonly inventoryId: string;
  readonly accountId: string;
  readonly adType: string;
}

const config: Feature<{ provider: AdTextProviders; sevio: SevioConfig }> = Object.freeze({
  title,
  isEnabled: false,
});

export default config;
