import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/designsystem')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/designsystem"!</div>
}
