/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiTab, EuiTabs, useEuiBackgroundColor } from '@elastic/eui';
import type { VFC } from 'react';
import React, { memo } from 'react';
import { css } from '@emotion/react';
import type { LeftPanelTabsType, UserDetailsLeftPanelTab } from './tabs';
import { FlyoutHeader } from '../../shared/components/flyout_header';

export interface PanelHeaderProps {
  /**
   * Id of the tab selected in the parent component to display its content
   */
  selectedTabId: UserDetailsLeftPanelTab;
  /**
   * Callback to set the selected tab id in the parent component
   */
  setSelectedTabId: (selected: UserDetailsLeftPanelTab) => void;
  /**
   * List of tabs to display in the header
   */
  tabs: LeftPanelTabsType;
}

/**
 * Header at the top of the left section.
 * Displays the investigation and insights tabs (visualize is hidden for 8.9).
 */
export const PanelHeader: VFC<PanelHeaderProps> = memo(
  ({ selectedTabId, setSelectedTabId, tabs }) => {
    const onSelectedTabChanged = (id: UserDetailsLeftPanelTab) => setSelectedTabId(id);
    const renderTabs = tabs.map((tab, index) => (
      <EuiTab
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={tab.id === selectedTabId}
        key={index}
        data-test-subj={tab['data-test-subj']}
      >
        {tab.name}
      </EuiTab>
    ));

    return (
      <FlyoutHeader
        css={css`
          background-color: ${useEuiBackgroundColor('subdued')};
          padding-bottom: 0 !important;
          border-block-end: none !important;
        `}
      >
        <EuiTabs size="l" expand>
          {renderTabs}
        </EuiTabs>
      </FlyoutHeader>
    );
  }
);

PanelHeader.displayName = 'PanelHeader';
