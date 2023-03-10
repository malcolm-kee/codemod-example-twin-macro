import tw from 'twin.macro'
import { Button, Logo } from './components'

const App = () => (
  <div
    css={tw`flex flex-col items-center justify-center h-screen bg-gradient-to-b from-electric to-ribbon`}
  >
    <div tw="flex flex-col justify-center h-full gap-y-5">
      <Button variant="primary">Submit</Button>
      <Button variant="secondary">Cancel</Button>
      <Button isSmall>Close</Button>
    </div>
    <Logo />
  </div>
)

export default App
