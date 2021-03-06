var loadSchemas = require('../lib/load-schemas');
var traverseScope = require('../lib/traverse');
var validateBySchemaConstructor = require('../lib/validation');
var validateBySchema;

/**
 * @param {Object} context
 * @param {Object} node
 */
function handleMemberExpressions(context, node) {
  var scope;
  var checkNativeTypes = context.settings.typelint && context.settings.typelint.lintNative;
  if (node.object && node.object.name) {
    scope = traverseScope(node, {
      init: {
        start: node.start,
        end: node.end
      },
      props: [],
      typedVars: [],
      nativeVars: [],
    });

    if (scope.props.length && scope.typedVars.length) {
      scope.typedVars.forEach(function (param) {
        if (!checkNativeTypes && param.format === 'native') return;
        validateBySchema(param, scope, node, context, param.format);
      });
    }
  }
}
/**
 * @param {Object} context
 * @returns {{MemberExpression: (function)}}
 */
module.exports = function (context) {
  var settings = context.settings.typelint;
  var schemas = loadSchemas(settings);
  var adapters = (settings && settings.adapters) ? settings.adapters.map(function (adapterName) {
    return require('../adapters/' + adapterName);
  }) : [];
  validateBySchema = validateBySchemaConstructor(schemas, adapters);
  return {
    MemberExpression: handleMemberExpressions.bind(null, context),
  };
};