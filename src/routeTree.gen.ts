/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ArtboardProjectIdImport } from './routes/artboard.$projectId'

// Create Virtual Routes

const SignupLazyImport = createFileRoute('/signup')()
const DesignsystemLazyImport = createFileRoute('/designsystem')()
const DatasetLazyImport = createFileRoute('/dataset')()
const DashboardLazyImport = createFileRoute('/dashboard')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const SignupLazyRoute = SignupLazyImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/signup.lazy').then((d) => d.Route))

const DesignsystemLazyRoute = DesignsystemLazyImport.update({
  id: '/designsystem',
  path: '/designsystem',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/designsystem.lazy').then((d) => d.Route))

const DatasetLazyRoute = DatasetLazyImport.update({
  id: '/dataset',
  path: '/dataset',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/dataset.lazy').then((d) => d.Route))

const DashboardLazyRoute = DashboardLazyImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/dashboard.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const ArtboardProjectIdRoute = ArtboardProjectIdImport.update({
  id: '/artboard/$projectId',
  path: '/artboard/$projectId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardLazyImport
      parentRoute: typeof rootRoute
    }
    '/dataset': {
      id: '/dataset'
      path: '/dataset'
      fullPath: '/dataset'
      preLoaderRoute: typeof DatasetLazyImport
      parentRoute: typeof rootRoute
    }
    '/designsystem': {
      id: '/designsystem'
      path: '/designsystem'
      fullPath: '/designsystem'
      preLoaderRoute: typeof DesignsystemLazyImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupLazyImport
      parentRoute: typeof rootRoute
    }
    '/artboard/$projectId': {
      id: '/artboard/$projectId'
      path: '/artboard/$projectId'
      fullPath: '/artboard/$projectId'
      preLoaderRoute: typeof ArtboardProjectIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/dashboard': typeof DashboardLazyRoute
  '/dataset': typeof DatasetLazyRoute
  '/designsystem': typeof DesignsystemLazyRoute
  '/signup': typeof SignupLazyRoute
  '/artboard/$projectId': typeof ArtboardProjectIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/dashboard': typeof DashboardLazyRoute
  '/dataset': typeof DatasetLazyRoute
  '/designsystem': typeof DesignsystemLazyRoute
  '/signup': typeof SignupLazyRoute
  '/artboard/$projectId': typeof ArtboardProjectIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/dashboard': typeof DashboardLazyRoute
  '/dataset': typeof DatasetLazyRoute
  '/designsystem': typeof DesignsystemLazyRoute
  '/signup': typeof SignupLazyRoute
  '/artboard/$projectId': typeof ArtboardProjectIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/dashboard'
    | '/dataset'
    | '/designsystem'
    | '/signup'
    | '/artboard/$projectId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/dashboard'
    | '/dataset'
    | '/designsystem'
    | '/signup'
    | '/artboard/$projectId'
  id:
    | '__root__'
    | '/'
    | '/dashboard'
    | '/dataset'
    | '/designsystem'
    | '/signup'
    | '/artboard/$projectId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  DashboardLazyRoute: typeof DashboardLazyRoute
  DatasetLazyRoute: typeof DatasetLazyRoute
  DesignsystemLazyRoute: typeof DesignsystemLazyRoute
  SignupLazyRoute: typeof SignupLazyRoute
  ArtboardProjectIdRoute: typeof ArtboardProjectIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  DashboardLazyRoute: DashboardLazyRoute,
  DatasetLazyRoute: DatasetLazyRoute,
  DesignsystemLazyRoute: DesignsystemLazyRoute,
  SignupLazyRoute: SignupLazyRoute,
  ArtboardProjectIdRoute: ArtboardProjectIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/dashboard",
        "/dataset",
        "/designsystem",
        "/signup",
        "/artboard/$projectId"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.lazy.tsx"
    },
    "/dataset": {
      "filePath": "dataset.lazy.tsx"
    },
    "/designsystem": {
      "filePath": "designsystem.lazy.tsx"
    },
    "/signup": {
      "filePath": "signup.lazy.tsx"
    },
    "/artboard/$projectId": {
      "filePath": "artboard.$projectId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
