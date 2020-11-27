import React, { Component } from "react";
import { Row, Col, Menu, Divider, PageHeader } from "antd";
import NeedlemanWunsch from "../methods/needleman_wunsch";
import SmithWaterman from "../methods/smith_waterman";
import "../styles/needleman_wunsch.css";
import AlignmentTypes from "../constants";

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
      colored: this.props.colored,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      prev_scores: nextProps.prev_scores,
      prev_scores_max: nextProps.prev_scores_max,
      score: nextProps.score,
      colored: nextProps.colored,
    });
  }

  render() {
    let rectClassName = "score-rect";
    if (this.state.colored) {
      rectClassName = rectClassName + " " + "score-rect-colored";
      console.log("rectClassName", rectClassName);
    } else {
      rectClassName = rectClassName + " " + "score-rect-white";
    }
    let graphics = [
      <rect x="0" y="0" width="67" height="67" className={rectClassName} />,
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      nw: nextProps.nw,
    });
  }

  render() {
    // first row (with sequence)
    const { currentPos } = this.props;
    console.log("currentPos", currentPos);
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
        const colored = currentPos.find(
          (elem) => elem[0] === i && elem[1] === j
        );

        G[i + 1].push(
          <ScoreCell
            colored={colored}
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

    const setCurrentPos = (e) => {
      this.props.setCurrentPos(e);
      // console.log(e)
    };
    console.log("alignments", alignments);
    return (
      <div style={{ marginTop: "40px" }}>
        <Menu style={{ borderRight: "2px solid grey" }}>
          {alignments.map((al, kkkk) => (
            <Menu.Item
              key={kkkk}
              onClick={(e) => setCurrentPos(al.position)}
              // value={al.position}
              // className="margin"
              // title={

              // }
              style={{ whiteSpace: "normal", height: "auto", fontSize: "24px" }}
            >
              {al.seq1
                .split("")
                .reverse()
                .join("")}
              <br />
              {al.seq2
                .split("")
                .reverse()
                .join("")}
            </Menu.Item>
          ))}
        </Menu>
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
      // show_grid: true,
      alignmentType: "",
      currentPos: [],
    };

    this.setCurrentPos = this.setCurrentPos.bind(this);
    // this.hide_grid = this.hide_grid.bind(this);
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

  setCurrentPos(arg) {
    this.setState({ currentPos: arg });
  }
  // hide_grid() {
  //   this.setState({ show_grid: false });
  // }

  render() {
    const {setAlignmentType} = this.props;
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
      <>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)",
          }}
          onBack={() => setAlignmentType('')}
          title={
            this.state.alignmentType !== "" &&
            (AlignmentTypes[this.state.alignmentType].title)
          }
        />
        {nw && (
          <Row>
            <Col span={6}>
              <Alignments setCurrentPos={this.setCurrentPos} nw={nw} />
            </Col>
            <Divider type="vertical" />
            <Col span={18}>
              <ScoringGrid nw={nw} currentPos={this.state.currentPos} />
            </Col>
          </Row>
        )}
      </>
    );
  }
}
