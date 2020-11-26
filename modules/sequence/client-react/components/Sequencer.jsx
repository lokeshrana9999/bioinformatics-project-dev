import React, { Component } from "react";
import NeedlemanWunsch from "../methods/needleman_wunsch";
import SmithWaterman from "../methods/smith_waterman";
import "../styles/needleman_wunsch.css";

/**
 * Single character cell
 */
class Cell extends Component {
  render() {
    return (
      <svg height="67" width="67" style={{ overflow: "hidden" }}>
        <g>
          <rect x="0" y="0" width="67" height="67" className="cell-rect" />
          <text x="20" y="50" className="cell">
            {this.props.value}
          </text>
        </g>
      </svg>
    );
  }
}

/**
 * Cell with (intermediate) scores at one position
 */
class ScoreCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prev_scores: this.props.prev_scores,
      prev_scores_max: this.props.prev_scores_max,
      score: this.props.score,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      prev_scores: nextProps.prev_scores,
      prev_scores_max: nextProps.prev_scores_max,
      score: nextProps.score,
    });
  }

  render() {
    let graphics = [
      <rect x="0" y="0" width="67" height="67" className="score-rect" />,
      <text x="40" y="53" className="score-text">
        {this.state.score}
      </text>,
    ];
    if (this.state.prev_scores.length) {
      graphics.push(
        <text x="7" y="53" className="score-option-text">
          {isNaN(this.state.prev_scores[0]) ? "" : this.state.prev_scores[0]}
        </text>
      );
      if (this.state.prev_scores_max[0]) {
        graphics.push(
          <path d="M37 43 L37 50 L30 47 Z" className="score-arrow" />
        );
      }
      graphics.push(
        <text x="7" y="20" className="score-option-text">
          {isNaN(this.state.prev_scores[1]) ? "" : this.state.prev_scores[1]}
        </text>
      );
      if (this.state.prev_scores_max[1]) {
        graphics.push(
          <path d="M35 35 L40 31 L33 27 Z" className="score-arrow" />
        );
      }

      graphics.push(
        <text x="40" y="20" className="score-option-text">
          {isNaN(this.state.prev_scores[2]) ? "" : this.state.prev_scores[2]}
        </text>
      );
      if (this.state.prev_scores_max[2]) {
        graphics.push(
          <path d="M49 33 L55 33 L52 25 Z" className="score-arrow" />
        );
      }
    }
    return (
      <svg height="67" width="67" style={{ overflow: "hidden" }}>
        <g>{graphics}</g>
      </svg>
    );
  }
}

/**
 * Grid with sequence and score cells
 */
class ScoringGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nw: this.props.nw,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      nw: nextProps.nw,
    });
  }

  render() {
    // first row (with sequence)
    let G = [[<Cell value={""} />, <Cell value={""} />]];
    this.state.nw.seq2.split("").forEach((c) => G[0].push(<Cell value={c} />));
    // first score row and beyond
    for (let i = 0; i < this.state.nw.S.length; i++) {
      let c_init;
      if (i === 0) {
        c_init = "";
      } else {
        c_init = this.state.nw.seq1[i - 1];
      }
      G.push([<Cell value={c_init} />]);
      for (let j = 0; j < this.state.nw.S[0].length; j++) {
        G[i + 1].push(
          <ScoreCell
            score={this.state.nw.S[i][j]}
            prev_scores={this.state.nw.I[i][j]}
            prev_scores_max={this.state.nw.T[i][j]}
          />
        );
      }
    }
    let grid_width = 67 * (this.state.nw.seq2.length + 2);
    if (this.state.nw.seq1 && this.state.nw.seq2) {
      return (
        <div className="center-text">
          <div style={{ display: "inline-block" }}>
            <div style={{ width: grid_width.toString() + "px" }}>{G}</div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

/**
 * Alignments output
 */
class Alignments extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const alignments = this.props.nw.alignmentTraceback();
    return (
      <div id="alignments">
        <ul>
          {alignments.map((al) => (
            <li
              className="margin"
              style={{ fontFamily: "monospace", fontSize: "24px" }}
            >
              <div>{al.seq1}</div>
              <div>{al.seq2}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    // Initial parameters
    this.state = {
      seq1: "ATTAC",
      seq2: "AATTC",
      m: 1,
      mm: -1,
      d: -1,
      show_grid: true,
      alignmentType: "",
    };

    this.show_grid = this.show_grid.bind(this);
    this.hide_grid = this.hide_grid.bind(this);
  }

  componentDidMount() {
    const { sequenceValues } = this.props;
    console.log(sequenceValues);
    var seq1N = "";
    var seq2N = "";
    if (sequenceValues.sequence1.length < sequenceValues.sequence2.length) {
      seq1N = sequenceValues.sequence1;
      seq2N = sequenceValues.sequence2;
    } else {
      seq1N = sequenceValues.sequence2;
      seq2N = sequenceValues.sequence1;
    }
    this.setState({
      seq1: seq1N,
      seq2: seq2N,
      m: sequenceValues.matchScore,
      mm: sequenceValues.mismatchPanelty,
      d: sequenceValues.gapPanelty,
      alignmentType: sequenceValues.alignmentType,
    });
  }

  show_grid() {
    this.setState({ show_grid: true });
  }
  hide_grid() {
    this.setState({ show_grid: false });
  }

  render() {
    let nw;

    // Calculate scoring matrix
    if (this.state.alignmentType == "GA") {
      nw = new NeedlemanWunsch(
        this.state.seq1,
        this.state.seq2,
        this.state.m,
        this.state.mm,
        this.state.d
      );
    } else if (this.state.alignmentType == "LA") {
      nw = new SmithWaterman(
        this.state.seq1,
        this.state.seq2,
        this.state.m,
        this.state.mm,
        this.state.d
      );
    }

    console.log("SequenceData", nw);

    return (
      <div className="container-fluid">
        {this.state.alignmentType !== "" && (
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-10">
              <div className="container">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a
                      className={
                        "nav-link " + (this.state.show_grid ? "active" : "")
                      }
                      onClick={this.show_grid}
                    >
                      Scoring grid
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={
                        "nav-link " + (this.state.show_grid ? "" : "active")
                      }
                      onClick={this.hide_grid}
                    >
                      Alignments
                    </a>
                  </li>
                </ul>
                <div>
                  {this.state.show_grid ? (
                    <ScoringGrid nw={nw} />
                  ) : (
                    <Alignments nw={nw} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
