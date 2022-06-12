# Ruby on Rails, Typescript React template

Internal project template for ExploratorLabs.
This template is built with the following features, tools, and frameworks

- [Node 16.13.0](https://nodejs.org/en/about/)
- [Ruby 2.7.2](https://www.ruby-lang.org/en/)
- [Ruby on Rails 6.1.4](https://rubyonrails.org/)
- [React 17.0.2](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [MobX](https://mobx.js.org/README.html)
- Remove [Turbolinks](https://github.com/turbolinks/turbolinks)
- [Scss](https://sass-lang.com/documentation/syntax) for styling `erb` files
- [Styled component](https://github.com/styled-components/styled-components) on React components
- [Super Query](https://www.npmjs.com/package/@themgoncalves/super-query) for adaptive styling with Styled Component
- [Letter opener](https://github.com/ryanb/letter_opener) for receiving email locally

# Content

- [Start with this template](#how-to-start-with-this-template)
- [Setup development environment](#how-to-setup-development-environment)
- Development related
  - [Create a React component](#how-to-create-a-react-component-best-practices)
  - [Set environment variables](https://medium.com/cedarcode/rails-5-2-credentials-9b3324851336)
  - [CSS styling](#how-to-implement-adaptive-styling)
  - [Linter](#linter)
- [Setup deployment environment](#deployment)
  - [Deployment to staging](#how-to-deploy-to-staging)
- [Reference](#references)

## How to start with this template

- If you want to start a new repo from this template, click on the **Use this template** button [How?](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository)
- If you want to contribute to this template, continue to the next step

1. Clone the repo down to your machine [How?](https://www.atlassian.com/git/tutorials/setting-up-a-repository/git-clone)
1. Install and switch your Ruby version to align with `.ruby-version`
1. Install and switch your Node version to align with `.nvmrc`
1. Run `yarn` and `bundle` to install all packages and gems
1. Regenerate master key and new credentials file with the following steps

   - Remove `config/credentials.yml.env` file
   - Run `EDITOR=nano rails credentials:edit` to regenerate a new credentials file and `master.key`

1. Change application's name in the following files

   - `app/views/layouts/application.html.erb`
   - `package.json`
   - `config/database.yml` - development, production and test database name
   - `.github/workflows/deployment.yml` - project name

1. Setup database with `bundle exec rails db:setup`

## How to setup development environment

1. Install and switch your Ruby version to align with `.ruby-version`
1. Install and switch your Node version to align with `.nvmrc`
1. Run `yarn` and `bundle` to install all packages and gems
1. Setup database with `bundle exec rails db:setup`
1. Spin up your environment with `foreman start -f Procfile.dev`
1. Now you can access the app via `http://localhost:3000`
1. Highly recommend install the following Extension if you are using VSCode
   - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - auto code formatter for JavaScript
   - [Code spell checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) - spell checker
   - [Ruby Rubocop](https://marketplace.visualstudio.com/items?itemName=misogi.ruby-rubocop) - auto code formatter for Ruby

## How to create a React component (Best practices)

We would like to separate the React components into View (`.tsx`) and Controller(`...UI.ts`) both by file and logically. We want to let the view file to handle as little logic as possible, while controller knows about the view as little as possible. That way we can ensure the maintainability of that component.

### In-page component

In-page component is React component that is being mounted inside an `erb` page, as oppose to page component.

Each component must have a MobX store which handle most of the logic of that component (e.g. onClick func, dynamic content, state, etc).

If the number of styled component is more than 15, consider moving them to a separating them to a new file call `uiComponents.tsx`

Sample component: `app/javascript/components/BigRedButton` , `app/views/home/landing.html.erb`

1. Create a new folder `ComponentName` under `app/javascript/components`
1. Create a component file `index.tsx` in that folder
1. Create a MobX store file `ComponentNameUI.ts` in that folder
1. Attach the react component in `erb` file with `<%= react_component("ComponentName", { prop1: "Something", prop2: "Interesting" }) %>`

[Ref](https://github.com/reactjs/react-rails/blob/master/README.md#4-generate-your-first-component)

### Page component

Page component is React component that is intended to be rendered as a page or controller action directly.

Same principles applied from [In-page component](#in-page-component). Each page component must have a MobX store which handles the logic of that component (e.g. onClick func, dynamic content, state, etc).

If the number of styled component is more than 15, consider moving them to a separating them to a new file call `uiComponents.tsx`.

Be aware that page component's folder name should have a suffix of `Page`.

Sample component: `app/javascript/components/SweetHomePage` , `app/controllers/home_controller.rb`

1. Create a new folder `ComponentNamePage` under `app/javascript/components`
1. Create a component file `index.tsx` in that folder
1. Create a MobX store file `ComponentNameUI.ts` in that folder
1. Directly render this page component in controller action with `render component: 'ComponentNamePage'`

[Ref](https://github.com/reactjs/react-rails/blob/master/README.md#controller-actions)

## How to implement (adaptive) styling

### Scss files

All adaptive `@mixin` are defined in `app/assets/stylesheets/breakpoints.scss`, please refer to that file to access all available `mixins`.

When applying css styles to an erb page, create a scss file with the following file pattern.

> `app/assets/stylesheets/views/<controllerName>/<actionName>.scss`

Sample scss file: `app/assets/stylesheets/views/home/landing.scss` for `landing` action in `home` controller.

### Styled components

Add adaptive styling scss with Super Query.

```
${SuperQuery().maxWidth.sm.css`
   font-weight: bold;
`};
```

Please reference `app/javascript/components/BigRedButton/uiComponents.tsx` for sample usages.

## Linter

- ESlint is setup for this repo for JavaScript. Configurable with `.eslint` file.
- RuboCop (with [Shopify's styling guide](https://ruby-style-guide.shopify.dev/)) is setup for this repo for Ruby. Configurable with `.rubocop.yml` file.

## Deployment

Since we are using Rails 6, which support multi environment credentials. We can following the guide below to setup them up by environment.

- Generate credentials for staging environment with `EDITOR=nano rails credentials:edit --environment staging`
- Generate credentials for production environment with `EDITOR=nano rails credentials:edit --environment production`
- Commit the `config/credentials/<environment>.yml.env` file to Git
- Setup environment variables on deployment server with the `config/credentials/<environment>.key` `RAILS_PRODUCTION_KEY` or `RAILS_STAGING_KEY`

### How to deploy to staging

- Ping Jack to add your ssh public kep to the staging server
- Add the remote dokku endpoint as your Git remote with `git remote add dokku dokku@dokku.explorator.ca:<project-name>`
- Now you can deploy by pushing your Git branch as `master` to Dokku (e.g. `git push dokku someone/2022-02-08-new-feature:master`)

## References:

- [Henry's Typescript React Template](https://github.com/exploratortech/Template-with-React-StyledComponents-Typescript)
- https://dev.to/ngduc/how-to-create-an-ui-app-using-rails-react-typescript-jest-4hm0
