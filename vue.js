var app1 = new Vue({
  el: "#app1",
  data: {
    cinema: [],
    error: false,
    selectedMovie: false,
    loading: true,
  },
  computed: {
    cinema2: function () {
      if (this.loading === false) return app2.computedList;
      return this.cinema;
    },
  },
  created: function () {
    const loading = this.$vs.loading({
      type: "square",
      color: "#ffa500",
      text: "loading...",
    });
    fetch(
      "https://raw.githubusercontent.com/StreamCo/react-coding-challenge/master/feed/sample.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.cinema = result.entries;
          loading.close();
          this.loading = false;
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
    search: "",
    filters: {
      sort: "",
      type: "",
      year: "",
    },
  },
  computed: {
    computedList: function () {
      let list = app1.cinema;
      // Search Engine
      if (app2.search !== "") {
        const regex2 = new RegExp(
          `${app2.search.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}`,
          "i"
        );
        list = list.filter((movie) => !movie.title.search(regex2));
      }

      //Sorting
      if (this.filters.sort !== "") {
        if (this.filters.sort === "name") {
          list = list.sort((a, b) => {
            if (a.title > b.title) return 1;
            if (a.title < b.title) return -1;
            return 0;
          });
        }
        if (this.filters.sort === "year") {
          list = list.sort((a, b) => {
            if (a.releaseYear > b.releaseYear) return 1;
            if (a.releaseYear < b.releaseYear) return -1;
            return 0;
          });
        }
        if (this.filters.sort === "type") {
          list = list.sort((a, b) => {
            if (a.programType > b.programType) return 1;
            if (a.programType < b.programType) return -1;
            return 0;
          });
        }
      }

      //filtering type
      if (this.filters.type !== "") {
        if (this.filters.type === "movie") {
          list = list.filter((film) => film.programType === "movie");
        }
        if (this.filters.type === "series") {
          list = list.filter((film) => film.programType === "series");
        }
      }

      //filtering year
      if (this.filters.year !== "") {
        if (this.filters.year === "2020") {
          list = list.filter((film) => film.releaseYear > 2009);
        }
        if (this.filters.year === "2010") {
          list = list.filter(
            (film) => film.releaseYear > 1999 && film.releaseYear < 2010
          );
        }
        if (this.filters.year === "2000") {
          list = list.filter(
            (film) => film.releaseYear > 1989 && film.releaseYear < 2000
          );
        }
      }
      return list;
    },
    escapedSearch: function () {
      // `this` points to the vm instance
      return this.search.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    },
  },
});
