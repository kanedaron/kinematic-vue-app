var app1 = new Vue({
  el: "#app1",
  data: {
    cinema: [],
    filters: {},
    error: false,
    selectedMovie:false
  },
  created: function () {
    const loading = this.$vs.loading({ type: "square",color:"#ffa500" });
    fetch(
      "https://raw.githubusercontent.com/StreamCo/react-coding-challenge/master/feed/sample.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.cinema = result.entries;
          loading.close();
        },
        
        (error) => {
          loading.close();
          this.error = error;
        }
      );
  },
});

var app2 = new Vue({
  el: "#app2",
  data: {
    value: "",
    value2: "",
    value3: "",
  },
});
