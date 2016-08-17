class QuickSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: this.props.quickSearch || ''
    };
  }

  updateQuickSearch(e) {
    var search = e.target.value

    this.setState({ search: search }, () => {
      this.props.updateQuickSearch(search);
    })
  }

  render() {
    return (
      <div className="quick-search">
        <input type="search"
               className="form-control"
               placeholder="Filter on text, people or tag"
               value={this.state.search}
               onChange={this.updateQuickSearch.bind(this)} />
        <i className="glyphicon glyphicon-search"></i>
        <i className="fa fa-times"></i>
      </div>
    )
  }
}

module.exports = QuickSearch