import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, Grid, Card, Divider } from '@material-ui/core';

import ExtentBased from './components/ExtentBased';
import LinkedList from './components/LinkedList';
import Indexed1Level from './components/Indexed1Level';
import LinkedIndex from './components/LinkedIndex';
import UnixSystem from './components/UnixSystem';

import DiskScheduling from './components/DiskScheduling';
import Raid from './components/Raid';

import './index.css';

const App = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => setValue(newValue);

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <Grid container justify='center'>
      <Grid item xs={10} lg={6}>
        <Card>
          <Grid container>
            <Grid item xs={4}>
              <Tabs orientation='vertical' value={value} onChange={handleChange}>
                <Tab label='Extent Based' value={0} />
                <Tab label='Linked List' value={1} />
                <Tab label='Indexed (1-level)' value={2} />
                <Tab label='Linked Index' value={3} />
                <Tab label='UNIX System' value={4} />
                <Tab label="" icon={<Divider style={{ width: '100%' }} />} disabled />
                <Tab label='Disk Scheduling' value={5} />
                <Tab label='Raid' value={6} />
              </Tabs>
              
            </Grid>
            <Grid item xs={8} style={{ padding: 16, minHeight: 'calc(100vh - 16px)' }}>
              {value === 0 && <ExtentBased />}
              {value === 1 && <LinkedList />}
              {value === 2 && <Indexed1Level />}
              {value === 3 && <LinkedIndex />}
              {value === 4 && <UnixSystem />}
              {value === 5 && <DiskScheduling />}
              {value === 6 && <Raid />}
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <div
        onClick={() => openInNewTab('https://www.facebook.com/kien.chuyengia/')}
        style={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          cursor: 'pointer',
        }}
      >@Kiên PT</div>
    </Grid>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));