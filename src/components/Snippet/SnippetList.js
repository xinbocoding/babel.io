import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { SnippetListShape } from '../../utils/shapes';

const SnippetList = ({ snippets }) => {
  return (
    <Grid container>
      {snippets.map(m => {
        return (
          <Grid item xs={12} spacing={3}>
            <Paper>
              <div>{`${m.title} (${m.mode})`}</div>
              <pre>
                <code>{m.code}</code>
              </pre>
              <div>
                <Link to={`/snippets/${m.id}`}>Edit</Link>
              </div>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

SnippetList.propTypes = {
  snippets: SnippetListShape
};

SnippetList.defaultProps = {
  snippets: []
};

export default SnippetList;
