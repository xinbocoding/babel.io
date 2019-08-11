import React from 'react';
import { SnippetListShape } from '../../utils/shapes';

const SnippetList = ({ snippets }) => {
  return (
    <div class="container">
      <div class="row">
        <div>Fix snippet list show</div>
        {/* {snippets.map(m => { */}

        {/* //   <div class="col-xs-12" item >
          //     <div>
          //       <div>{`${m.title} (${m.mode})`}</div>
          //       <pre>
          //         <code>{m.code}</code>
          //       </pre>
          //       <div>
          //         <Link to={`/snippets/${m.id}`}>Edit</Link>
          //       </div>
          //     </div>
          //   </div>
          // ); */}
      </div>
    </div>
  );
};

SnippetList.propTypes = {
  snippets: SnippetListShape
};

SnippetList.defaultProps = {
  snippets: []
};

export default SnippetList;
