# Spatie docs

[![Netlify Status](https://api.netlify.com/api/v1/badges/855d0daf-00d9-4dcb-8fca-66f51c48edee/deploy-status)](https://app.netlify.com/sites/docs-spatie/deploys)

This repository contains the Hugo configuration of the docs site. The application is automatically deployed to https://docs.spatie.be

## Support us

[![Image](https://github-ads.s3.eu-central-1.amazonaws.com/docs.spatie.be.jpg)](https://spatie.be/github-ad-click/docs.spatie.be)

We invest a lot of resources into creating [best in class open source packages](https://spatie.be/open-source). You can support us by [buying one of our paid products](https://spatie.be/open-source/support-us).

We highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using. You'll find our address on [our contact page](https://spatie.be/about-us). We publish all received postcards on [our virtual postcard wall](https://spatie.be/open-source/postcards).

## Installation

First ensure that Hugo is installed on your system.

```
brew install hugo
```

Node.js is also a requirement. You can download node.js from [nodejs.org](https://nodejs.org/en/).

Next, fetch the content from our package repositories. You only need to run this step once.

```
node fetch-content.js
```

Now the site can be built with Hugo. During development, you can have Hugo spin up a local webserver and watch for changes.

```
hugo server
```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

### Security

If you discover any security related issues, please email freek@spatie.be instead of using the issue tracker.

## Credits

- [Sebastian De Deyne](https://github.com/sebastiandedeyne)
- [Rias Van der Veken](https://github.com/riasvdv)
- [All Contributors](../../contributors)

## About Spatie

Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
