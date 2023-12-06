import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IoMoon } from "react-icons/io5";
import { FaSun } from "react-icons/fa";

import Weather from '../weather/weather';


function App() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <>
      <ActionIcon
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        variant="default"
        size="xl"
        aria-label="Toggle color scheme"
      >
        {computedColorScheme === 'light' ? <FaSun size="1.1rem" /> : <IoMoon size="1.1rem" />}
      </ActionIcon>
      <div className='center'>

        <Weather/>
      </div>
    </>
  );
}

export default App;