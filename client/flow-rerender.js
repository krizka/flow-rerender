
const FOOS = [undefined, 'Hello', undefined];
const BARS = [undefined, undefined, 'World'];

Template.Foo.onCreated(function () {
  console.log('Foo created');
  this.autorun(() => {
    const id = FlowRouter.getParam('id');
    console.log('Foo autorun', id);
    this.foo = FOOS[+id];
    if (!this.foo)
      console.error('Foo with id', id, 'not found!!!');
  });
});
Template.Foo.onDestroyed(function () {
  console.log('Foo destroyed');
});

Template.Foo.helpers({
  foo () {
    var foo = Template.instance().foo;
    console.log('Foo.foo helper', foo);
    return foo;
  }
});


Template.Bar.onCreated(function () {
  console.log('Bar created');
  this.autorun(() => {
    const id = FlowRouter.getParam('id');
    console.log('Bar autorun', id);
    this.bar = BARS[+id];
    if (!this.bar)
      console.error("Bar with id", id, 'not found!!!');
  });
});
Template.Bar.onDestroyed(function () {
  console.log('Bar destroyed');
});

Template.Bar.helpers({
  bar () {
    var bar = Template.instance().bar;
    console.log('Bar.bar helper', bar);
    return bar;
  }
});


FlowRouter.route('/foo/:id', {
  name: 'foo',
  action: function () {
    BlazeLayout.render('Layout', { template: 'Foo' });
  }
});

FlowRouter.route('/bar/:id', {
  name: 'bar',
  action: function () {
    BlazeLayout.render('Layout', { template: 'Bar' });
  }
});
