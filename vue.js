var app1 = new Vue({
  el: "#app1",
  data: {
    cinema: [],
    filters: {},
    error: false,
    selectedMovie:false,
    loading:true,
  },
  computed: {
      cinema2: function () {
        if (this.loading===false)
        return app2.computedList
        return this.cinema
      }
  },
  created: function () {
    const loading = this.$vs.loading({ type: "square",color:"#ffa500",text:"loading..." });
    fetch(
      "https://raw.githubusercontent.com/StreamCo/react-coding-challenge/master/feed/sample.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.cinema = result.entries;
          loading.close();
          this.loading=false;
        },
        
        (error) => {
          loading.close();
          this.error = error;
        }
      );
  }
  
});

var app2 = new Vue({
  el: "#app2",
  data: {
    search: "",
    value2: "",
    value3: "",
  },
  computed: {
    computedList: function () {
      let list = app1.cinema
      if (app2.search !== "") {
        const regex2 = new RegExp(`${app2.search.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}`, "i");
        list = list.filter((movie) => movie.title.search(regex2) !== -1);
      }
      return list
    },
    // a computed getter
    escapedSearch: function () {
      // `this` points to the vm instance
      return this.search.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    },
  },
});
