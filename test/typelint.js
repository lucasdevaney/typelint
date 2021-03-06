var exec = require('child_process').exec;
var assert = require('assert');

const getCmd = (file, config) => {
  if (!config) config = '.eslintrc.yml';
  const cmd = `node ${__dirname}/../node_modules/.bin/eslint --rulesdir=${__dirname}/../rules/ -c ${__dirname}/fixtures/${config} ${__dirname}/fixtures/${file}.js`;
  console.log(cmd);
  return cmd;
}

describe('typelint', function () {

  it('Run with default config without settings', (done) => {
    exec(getCmd('test_empty', '.simple.yml'), (err, stdout, stderr) => {
      if (err || stderr) return done(new Error(stdout));
      done();
    });
  });

  it('Regular function comments/variable', (done) => {
    exec(getCmd('test'), (err, stdout, stderr) => {
      if (!err) {
        throw new Error('Should throw error');
      }
      assert(!!stdout.match(/first_Name/), true);
      done();
    });
  });

  it('JSDoc typedef', (done) => {
    exec(getCmd('test'), (err, stdout, stderr) => {
      if (!err) {
        throw new Error('Should throw error');
      }
      assert(!!stdout.match(/first_Name/), true);
      done();
    });
  });

  it.skip('Code in the root scope', (done) => {
    exec(getCmd('test_root_scope'), (err, stdout, stderr) => {
      if (err || stderr) return done(new Error(stdout));
      done();
    });
  });

  it.skip('Transfer variables, should throw', (done) => {
    exec(getCmd('test_pass_vars'), (err, stdout, stderr) => {
      if (!err) {
        throw new Error('Should throw error, because wrong member access');
      }
      done();
    });
  });

  it('Const definition before arrow function', (done) => {
    exec(getCmd('test_es6'), (err, stdout, stderr) => {
      if (err || stderr) return done(new Error(stdout));
      done();
    });
  });

  it('Const definition before arrow function', (done) => {
    exec(getCmd('test_arrays'), (err, stdout, stderr) => {
      if (err || stderr) return done(new Error(stdout));
      done();
    });
  });

  it('@var and internal comments', (done) => {
    exec(getCmd('internal_comments'), (err, stdout, stderr) => {
      if (!err) {
        throw new Error('@var: should throw error, because wrong member access');
      }
      done();
    });
  });

  it('Const definition before arrow function', (done) => {
    exec(getCmd('test_arrays_access'), (err, stdout, stderr) => {
      if (err || stderr) return done(new Error(stdout));
      done();
    });
  });

  it('JSDoc types', (done) => {
    exec(getCmd('jsdoc_types'), (err, stdout, stderr) => {
      if (!err) {
        throw new Error('Should throw error');
      }
      done();
    });
  });

  it('Var reassign', (done) => {
    exec(getCmd('test_reassign'), (err, stdout, stderr) => {
      if (!err) {
        throw new Error('Should throw error');
      }
      assert(!!stdout.match(/Invalid access to property wrong for type human/), true);
      done();
    });
  });

});