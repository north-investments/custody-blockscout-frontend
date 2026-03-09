import type { HTMLChakraProps } from '@chakra-ui/react';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';
import useApiQuery from 'lib/api/useApiQuery';
import { Link } from 'toolkit/chakra/link';
import { copy } from 'toolkit/utils/htmlEntities';
import { CONTENT_MAX_WIDTH } from 'ui/shared/layout/utils';
import NetworkAddToWallet from 'ui/shared/NetworkAddToWallet';

import IntTxsIndexingStatus from './IntTxsIndexingStatus';
import getApiVersionUrl from './utils/getApiVersionUrl';

const FRONT_VERSION_URL = `https://github.com/blockscout/frontend/tree/${ config.UI.footer.frontendVersion }`;
const FRONT_COMMIT_URL = `https://github.com/blockscout/frontend/commit/${ config.UI.footer.frontendCommit }`;

const Footer = () => {

  const { data: backendVersionData } = useApiQuery('general:config_backend_version', {
    queryOptions: {
      staleTime: Infinity,
      enabled: !config.features.multichain.isEnabled,
      refetchOnMount: false,
    },
  });
  const apiVersionUrl = getApiVersionUrl(backendVersionData?.backend_version);

  const frontendLink = (() => {
    if (config.UI.footer.frontendVersion) {
      return <Link href={ FRONT_VERSION_URL } external noIcon>{ config.UI.footer.frontendVersion }</Link>;
    }

    if (config.UI.footer.frontendCommit) {
      return <Link href={ FRONT_COMMIT_URL } external noIcon>{ config.UI.footer.frontendCommit }</Link>;
    }

    return null;
  })();

  const currentYear = (new Date()).getFullYear();

  const containerProps: HTMLChakraProps<'div'> = {
    as: 'footer',
    bg: { _light: '#fafafa', _dark: 'navy.900' },
    borderTopWidth: '1px',
    borderTopColor: { _light: '#e5e5e5', _dark: 'whiteAlpha.100' },
  };

  return (
    <Box { ...containerProps }>
      <Box
        maxW={ `${ CONTENT_MAX_WIDTH }px` }
        m="0 auto"
        px={{ base: 4, lg: config.UI.navigation.layout === 'horizontal' ? 6 : 12, '2xl': 6 }}
        py={{ base: 6, lg: 10 }}
      >
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap={{ base: 8, lg: 16 }}
          mb={ 8 }
        >
          { /* Brand Column */ }
          <Box flex="1" minW="200px">
            <Text fontSize="xl" fontWeight="500" color={{ _light: '#202020', _dark: 'whiteAlpha.900' }} fontFamily="heading" mb={ 2 }>
              North Investments
            </Text>
            <Text fontSize="sm" color={{ _light: '#666666', _dark: 'whiteAlpha.600' }} fontFamily="heading">
              Safe, Simple, Regulated
            </Text>
            <Flex mt={ 4 } gap={ 2 } _empty={{ display: 'none' }}>
              { !config.UI.indexingAlert.intTxs.isHidden && <IntTxsIndexingStatus/> }
              { !config.features.multichain.isEnabled && <NetworkAddToWallet source="Footer"/> }
            </Flex>
          </Box>

          { /* Company Links */ }
          <Box>
            <Text
              fontSize="sm"
              fontWeight="500"
              color={{ _light: '#202020', _dark: 'whiteAlpha.900' }}
              mb={ 3 }
              textTransform="uppercase"
              letterSpacing="0.05em"
              fontFamily="heading"
            >
              Company
            </Text>
            <VStack gap={ 2 } alignItems="start">
              <Link
                href="https://northinvestments.co/about"
                external
                noIcon
                color={{ _light: '#666666', _dark: 'whiteAlpha.600' }}
                fontSize="sm"
                fontFamily="heading"
              >
                Who We Are
              </Link>
              <Link
                href="https://northinvestments.co/contact"
                external
                noIcon
                color={{ _light: '#666666', _dark: 'whiteAlpha.600' }}
                fontSize="sm"
                fontFamily="heading"
              >
                Contact Us
              </Link>
              <Link
                href="https://northinvestments.co/disclosures"
                external
                noIcon
                color={{ _light: '#666666', _dark: 'whiteAlpha.600' }}
                fontSize="sm"
                fontFamily="heading"
              >
                Disclosures
              </Link>
            </VStack>
          </Box>

          { /* Contact Information */ }
          <Box>
            <Text
              fontSize="sm"
              fontWeight="500"
              color={{ _light: '#202020', _dark: 'whiteAlpha.900' }}
              mb={ 3 }
              textTransform="uppercase"
              letterSpacing="0.05em"
              fontFamily="heading"
            >
              Contact
            </Text>
            <VStack gap={ 2 } alignItems="start" fontSize="sm" color={{ _light: '#666666', _dark: 'whiteAlpha.600' }} fontFamily="heading">
              <Text>info@northinvestments.co</Text>
              <Text>northinvestments.co</Text>
              <Text>682-394-4553</Text>
            </VStack>
          </Box>

          { /* Address */ }
          <Box>
            <Text
              fontSize="sm"
              fontWeight="500"
              color={{ _light: '#202020', _dark: 'whiteAlpha.900' }}
              mb={ 3 }
              textTransform="uppercase"
              letterSpacing="0.05em"
              fontFamily="heading"
            >
              Address
            </Text>
            <VStack gap={ 2 } alignItems="start" fontSize="sm" color={{ _light: '#666666', _dark: 'whiteAlpha.600' }} fontFamily="heading">
              <Text>201 American Concourse</Text>
              <Text>Suite L010</Text>
              <Text>Fort Worth, TX 76106</Text>
            </VStack>
          </Box>
        </Flex>

        { /* Bottom Bar */ }
        <Box borderTopWidth="1px" borderTopColor={{ _light: '#e5e5e5', _dark: 'whiteAlpha.100' }} pt={ 6 }>
          <Text fontSize="xs" color={{ _light: '#666666', _dark: 'whiteAlpha.500' }} fontStyle="italic" lineHeight="tall" mb={ 4 } fontFamily="heading">
            North Investments Company LLC operates as a Special Purpose Broker-Dealer limited to digital asset securities.
            We do not offer cryptocurrency trading, wallet services, or self-custody, and we do not provide investment advice or recommendations.
          </Text>

          <Flex justifyContent="center" mb={ 4 } gap={ 4 } flexWrap="wrap" fontSize="sm">
            <Link href="https://northinvestments.co/disclosures" external noIcon color={{ _light: '#666666', _dark: 'whiteAlpha.600' }} fontFamily="heading">
              Legal & Regulatory Disclosures
            </Link>
          </Flex>

          <Text textAlign="center" fontSize="sm" color={{ _light: '#666666', _dark: 'whiteAlpha.600' }} mb={ 3 } fontFamily="heading">
            North Investments Company LLC is an SEC-registered broker-dealer. Member FINRA and SIPC. CRD #329409.
          </Text>

          <Text textAlign="center" fontSize="xs" color={{ _light: '#666666', _dark: 'whiteAlpha.500' }} fontFamily="heading">
            { copy } { currentYear } North Investments. All rights reserved.
          </Text>

          { /* Version Info */ }
          <Flex justifyContent="center" mt={ 4 } gap={ 4 } textStyle="xs" color={{ _light: '#999999', _dark: 'whiteAlpha.400' }}>
            { apiVersionUrl && (
              <Text>
                Backend: <Link href={ apiVersionUrl } external noIcon>{ backendVersionData?.backend_version }</Link>
              </Text>
            ) }
            { frontendLink && (
              <Text>
                Frontend: { frontendLink }
              </Text>
            ) }
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(Footer);
