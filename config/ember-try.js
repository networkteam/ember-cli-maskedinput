/*jshint node:true*/

function scenario(version) {
  return {
    name: 'ember-' + version,
    bower: {
      dependencies: {
        ember: '~' + version + '.0'
      },
      resolutions: {
        ember: '~' + version + '.0'
      }
    }
  }
}

module.exports = {
  scenarios: [
    scenario('1.13'),
    scenario('2.4'),
    scenario('2.5'),
    scenario('2.6'),
    {
      name: 'ember-release',
      bower: {
        dependencies: {
          'ember': 'components/ember#release'
        },
        resolutions: {
          'ember': 'release'
        }
      }
    },
    {
      name: 'ember-beta',
      bower: {
        dependencies: {
          'ember': 'components/ember#beta'
        },
        resolutions: {
          'ember': 'beta'
        }
      }
    },
    {
      name: 'ember-canary',
      bower: {
        dependencies: {
          'ember': 'components/ember#canary'
        },
        resolutions: {
          'ember': 'canary'
        }
      }
    }
  ]
};
