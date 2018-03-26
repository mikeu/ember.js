import { assert } from 'ember-debug';
import { Object as EmberObject, String as StringUtils } from 'ember-runtime';
import { EMBER_ANGLE_BRACKET_INVOCATION } from 'ember/features';

export default EmberObject.extend({
  componentFor(name, owner, options) {
    assert(`You cannot use '${name}' as a component name. Component names must contain a hyphen or start with a capital letter.`, (() => {
      return ~name.indexOf('-') || name.charAt(0) === name.charAt(0).toUpperCase();
    })());

    let fullName = `component:${normalizeName(name)}`;

    return owner.factoryFor(fullName, options);
  },

  layoutFor(name, owner, options) {
    assert(`You cannot use '${name}' as a component name. Component names must contain a hyphen.`, (() => {
      return ~name.indexOf('-') || name.charAt(0) === name.charAt(0).toUpperCase();
    })());

    let templateFullName = `template:components/${normalizeName(name)}`;
    return owner.lookup(templateFullName, options);
  }
});

function normalizeName(name) {
  if (EMBER_ANGLE_BRACKET_INVOCATION) {
    if (name.charAt(0) === name.charAt(0).toUpperCase()) {
      name = `${StringUtils.dasherize(name)}`;
    }
  }

  return name;
}