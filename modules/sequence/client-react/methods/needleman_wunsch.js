/**
 * NeedlemanWunsch - Implementation of Needleman-Wunsch algorithm for demonstration purposes.
 */
class NeedlemanWunsch {
  /**
   * @param {string} seq1 - First
   * @param {string} seq2
   * @param {number} match_score
   * @param {number} mismatch_penalty
   * @param {number} gap_penalty
   * */
  constructor(seq1, seq2, match_score, mismatch_penalty, gap_penalty) {
    // Compared sequences
    this.seq1 = seq1;
    this.seq2 = seq2;
    // Scoring parameters
    this.match_score = match_score;
    this.mismatch_penalty = mismatch_penalty;
    this.gap_penalty = gap_penalty;
    // Intermediate scores matrix (scores for [`insert`, `match`, `delete`] positions)
    this.I = [];
    // Score matrix (best score out of intermediate scores)
    this.S = [];
    // Traceback matrix (boolean values for [`insert`, `match`, `delete`] positions)
    this.T = [];
    // Alignments
    this.final_alignments = [];

    // Calculate scores and tracebacks
    this.calcScoresAndTracebacks();
  }

  /**
   * Calculates (intermediate) scores and tracebacks using provided parameters
   */
  calcScoresAndTracebacks() {
    this.S.push([0]);
    this.I.push([[null, null, null]]);
    this.T.push([[false, false, false]]);

    // Calculate scores and traceback on first row
    for (let j = 1; j < this.seq2.length + 1; j++) {
      this.S[0].push(this.S[0][this.S[0].length - 1] + this.gap_penalty);
      this.I[0].push([null, null, null]);
      this.T[0].push([true, false, false]);
    }

    // Generate other rows
    for (let i = 1; i < this.seq1.length + 1; i++) {
      this.S.push([this.S[i - 1][0] + this.gap_penalty]);
      this.I.push([[null, null, null]]);
      this.T.push([[false, false, true]]);
      for (let j = 1; j < this.seq2.length + 1; j++) {
        const insert = this.S[i][j - 1] + this.gap_penalty;
        const del = this.S[i - 1][j] + this.gap_penalty;
        // similarity
        let sim_score;
        if (this.seq1[i - 1] === this.seq2[j - 1]) {
          sim_score = this.match_score;
        } else {
          sim_score = this.mismatch_penalty;
        }
        const match = this.S[i - 1][j - 1] + sim_score;
        const intermediate_scores = [insert, match, del];
        const score = Math.max(...intermediate_scores);
        const tracebackTypeStatus = intermediate_scores.map(
          (e, i) => e === score
        );
        this.S[i].push(score);
        this.I[i].push(intermediate_scores);
        this.T[i].push(tracebackTypeStatus);
      }
    }
  }

  /**
   * Finds next alignment locations (children) from a position in scoring matrix
   * @param {number[]} pos m- Position in scoring matrix
   * @return {Object[]} children - Children positions and alignment types
   */
  alignmentChildren(pos) {
    let i, j, children;
    [i, j] = pos;
    children = [];
    const traceback_type_status = this.T[i][j];
    if (traceback_type_status[0]) {
      // insert
      children.push({ pos: [i, j - 1], tracebackType: 0 });
    }
    if (traceback_type_status[1]) {
      // match
      children.push({ pos: [i - 1, j - 1], tracebackType: 1 });
    }
    if (traceback_type_status[2]) {
      // delete
      children.push({ pos: [i - 1, j], tracebackType: 2 });
    }
    return children;
  }

  /**
   * Runs through scoring matrix from bottom-right to top-left using traceback values to create all optimal alignments
   * @returns {Array}
   */
  alignmentTraceback() {
    let final_alignments = [];
    let root = {
      next: null,
      pos: [this.seq1.length, this.seq2.length],
      alignment: {
        seq1: "",
        seq2: "",
        position: [],
      },
    };
    let current, child, children, len, depth, alignment, pos, t;
    current = root;
    let positionArr = [];
    while (current) {
      pos = current.pos;
      alignment = current.alignment;
      positionArr.push(current.pos);
      
      // Get children alignments
      children = this.alignmentChildren(current.pos);
      // Store completed alignments
      if (!children.length) {
        current.alignment.position = positionArr;
        positionArr = []
        final_alignments.push(alignment);
      }
      current = current.next;
      for (t = 0, len = children.length; t < len; t++) {
        child = children[t];
        child.alignment = {
          seq1: alignment.seq1.concat(
            child.tracebackType === 0 ? "-" : this.seq1[pos[0] - 1]
          ), // -1 refers to offset between  scoring matrix and the sequence
          seq2: alignment.seq2.concat(
            child.tracebackType === 2 ? "-" : this.seq2[pos[1] - 1]
          ),
        };
        // Move down a layer
        child.next = current;
        current = child;
      }
    }
    return final_alignments;
  }
}
export default NeedlemanWunsch;
