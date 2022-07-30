import React from 'react';
import {
  BrowserView,
  MobileView,
} from 'react-device-detect';
import { Redirect } from 'react-router';

export default function IndexPage() {
  return (
    <>
      <BrowserView>
        <Redirect
          to={{
            pathname: '/browser',
          }}
        />
      </BrowserView>
      <MobileView>
        <Redirect to={{
          pathname: '/mobile',
        }}
        />
      </MobileView>
    </>
  );
}
