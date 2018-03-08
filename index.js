"use strict";

exports.__esModule = true;

exports.default = function(babel) {
  const { types: t } = babel;
  return {
    name: "moment-scope-injector",
    visitor: {
      EmptyStatement(path) {
        let body = path.container[1];
        let exp2 = t.memberExpression(t.identifier("global"), t.identifier("moment"));
        let exp1 = t.memberExpression(t.thisExpression(), t.identifier("moment"));
        let exp3 = t.assignmentExpression("=", exp1, exp2);
        let exp4 = t.expressionStatement(exp3);
        path.insertBefore(
          t.functionDeclaration(
            t.identifier("____"),
            [t.identifier("global")],
            t.blockStatement([exp4, body])
          )
        );

        path.insertAfter(
          t.expressionStatement(t.newExpression(t.identifier("____"), [t.identifier("$G")]))
        );
      },
      ExpressionStatement(path) {
        if (path.parent.type === "Program" && path.node.expression.type !== "NewExpression") {
          path.remove();
        }
      }
    }
  };
}
