import React, { useState, useEffect } from "react";
import Articles from "./components/Articles";
import axios from "axios";
import { Route, Switch, NavLink, BrowserRouter } from "react-router-dom";
// import NavBar from "./components/Layout/NavBar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
// import { TopStories, Search } from "./components";
import TopStories from "./components/TopStory/TopStories";
import Search from "./components/Search";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [topStories, setTopStories] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      const res = await axios.get(
        ` https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:("Arts")&sort=newest&api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`
      );
      setArticles(res.data.response.docs);

      setLoading(false);
    };

    getArticles();
  }, []);

  const searchArticles = async (text) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${text}&api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`
    );
    setArticles(res.data.response.docs);
    setLoading(false);
  };

  const getTopArticles = async (section) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`
    );
    setTopStories(res.data.results);
    setLoading(false);
  };

  return (
    <div>
      <Container>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h2"
          align="center"
        >
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <>
                    <Search searchArticles={searchArticles} />
                    <NavLink to="/topstories">
                      <Link component="button" variant="body2">
                        Go to top stories in World, Tech and U.S
                      </Link>
                    </NavLink>
                    <Articles loading={loading} articles={articles} />
                  </>
                )}
              />

              <Route
                exact
                path="/topstories"
                render={() => (
                  <>
                    <TopStories
                      loading={loading}
                      topStories={topStories}
                      getTopArticles={getTopArticles}
                    />
                  </>
                )}
              />
            </Switch>
          </BrowserRouter>
        </Typography>
      </Container>
    </div>
  );
};

export default App;
