$(function(){
   fetch('/api/categories')
        .then((res) => {
            return res.json();
        })
        .then((categories) => {
            console.log(categories)
            var names = categories.map((cat) => cat.name);
            $("#autocomplete").typeahead({ source: categories })
        });
});