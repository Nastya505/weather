import Weather from "../weather/weather";
import {
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';

import { Button } from '@mantine/core';

import Theme from "../thems/theme";

function App(){
  const { colorScheme, setColorScheme } = useMantineColorScheme();


  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

      return (
        <>
         <Weather/>


          <Button onClick={toggleColorScheme}>Toggle color scheme</Button>

        </>
      );
}

export default App;
