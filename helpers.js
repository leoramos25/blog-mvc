exports.defaultPageTitle = 'NodeJS';

exports.menu = [
    { name: 'Home', slug: '/', guest:true, logged:true },
    { name: 'Login', slug: '/users/login', guest:true, logged:false },
    { name: 'Sign up', slug: '/users/register', guest:true, logged:false },
    { name: 'Add post', slug: '/post/add', guest:false, logged:true },
    { name: 'Sair', slug: '/users/logout', guest:false, logged:true }
];