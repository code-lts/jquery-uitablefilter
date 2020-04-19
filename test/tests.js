var expect = chai.expect;

describe('has_words', () => {
	before(function () {
		thw = 'test has words'
		has_words = $.uiTableFilter.has_words
	});

	it('should return true when word is present', function () {
		expect(has_words(thw, ['t'])).to.be.true;
		expect(has_words(thw, ['t'])).to.be.true;
		expect(has_words(thw, ['te'])).to.be.true;
		expect(has_words(thw, ['tes'])).to.be.true;
		expect(has_words(thw, ['test'])).to.be.true;
		expect(has_words(thw, [' has '])).to.be.true;
		expect(has_words(thw, ['words'])).to.be.true;
		expect(has_words(thw, ['test has words'])).to.be.true;
		expect(has_words(thw, ['test', 'has'])).to.be.true;
		expect(has_words(thw, ['test', 'has', 'words'])).to.be.true;
	});
	it('should return false when word is not present', function () {
		expect(has_words(thw, ['z'])).to.be.false;
		expect(has_words(thw, ['tz'])).to.be.false;
		expect(has_words(thw, ['t', 'z'])).to.be.false;
		expect(has_words(thw, ['test has z'])).to.be.false;
		expect(has_words(thw, ['test', 'has', 'z'])).to.be.false;
	});
	it('should be optionally case sensitive', function () {
		expect(has_words(thw, ['T'], true)).to.be.false;
		expect(has_words(thw, ['tE'], true)).to.be.false;
		expect(has_words(thw, ['t', 'wOr'], true)).to.be.false;
		expect(has_words(thw, ['test has'], false)).to.be.true;
	});
});

describe('filterNormalTable', () => {
	before(function () {
		var theTable = $("#testtable")
		filter = function (pattern) {
			$.uiTableFilter(theTable, pattern, 0);
		}

		resetFilter = function () {
			filter('');
		}
	});

	after(function () {
		resetFilter();
	});

	it('no filter, all rows must be visible', function () {

		filter('')
		expect($('#headrow:visible').html()).to.equal($('#headrow').html())
		expect($('#testrow1:visible').html()).to.equal($('#testrow1').html())
		expect($('#testrow2:visible').html()).to.equal($('#testrow2').html())
	});

	it('simple filter 1', function () {

		filter('turtle')
		expect($('#headrow:visible').html()).to.equal($('#headrow').html())
		expect($('#testrow1:visible').html()).to.equal($('#testrow1').html())
		expect($('#testrow2:visible').html()).to.equal(undefined);
	});

	it('simple filter 2', function () {

		filter('dog')
		expect($('#headrow:visible').html()).to.equal($('#headrow').html())
		expect($('#testrow1:visible').html()).to.equal($('#testrow1').html())
		expect($('#testrow2:visible').html()).to.equal(undefined);
	});

	it('simple filter 3', function () {

		filter('whale')
		expect($('#headrow:visible').html()).to.equal($('#headrow').html())
		expect($('#testrow1:visible').html()).to.equal(undefined);
		expect($('#testrow2:visible').html()).to.equal($('#testrow2').html())
	});

	it('simple head filter (head must still be visible)', function () {

		filter('sea')
		expect($('#headrow:visible').html()).to.equal($('#headrow').html())
		expect($('#testrow1:visible').html()).to.equal(undefined);
		expect($('#testrow2:visible').html()).to.equal(undefined);
	});

	it('simple filter an resetFilter', function () {
		filter('turtle')
		expect($('#headrow:visible').html()).to.equal($('#headrow').html())
		expect($('#testrow1:visible').html()).to.equal($('#testrow1').html())
		expect($('#testrow2:visible').html()).to.equal(undefined);
		filter('')
		expect($('#headrow:visible').html()).to.equal($('#headrow').html())
		expect($('#testrow1:visible').html()).to.equal($('#testrow1').html())
		expect($('#testrow2:visible').html()).to.equal($('#testrow2').html())
	});
});


describe('filterInnerTable', () => {
	before(function () {
		var theTable = $("#testtable2")
		filter = function (pattern) {
			$.uiTableFilter(theTable, pattern, 0);
		}

		resetFilter = function () {
			filter('');
		}
	});

	after(function () {
		resetFilter();
	});

	it('no filter, all rows must be visible', function () {

		filter('')
		expect($('#headrow2:visible').html()).to.equal($('#headrow2').html())
		expect($('#testrow2.1:visible').html()).to.equal($('#testrow2.1').html())
		expect($('#testrow2.2:visible').html()).to.equal($('#testrow2.2').html())
		expect($('#innerHeadRow:visible').html()).to.equal($('#innerHeadRow').html())
		expect($('#innerRow1:visible').html()).to.equal($('#innerRow1').html())
		expect($('#innerRow2:visible').html()).to.equal($('#innerRow2').html())
	});


	it('filter for non existing value', function () {

		filter('blaBlubb')
		expect($('#headrow2:visible').html()).to.equal($('#headrow2').html())
		expect($('#testrow2.1:visible').html()).to.equal($('#testrow2.1').html())
		expect($('#testrow2.2:visible').html()).to.equal(undefined);
		expect($('#innerHeadRow:visible').html()).to.equal(undefined);//to.equal($('#innerHeadRow').html())
		expect($('#innerRow1:visible').html()).to.equal(undefined);//to.equal($('#innerRow1').html())
		expect($('#innerRow2:visible').html()).to.equal(undefined);//to.equal($('#innerRow2').html())
	});

	it('filter for existing value (complete inner table must disappear)', function () {

		filter('whale')
		expect($('#headrow2:visible').html()).to.equal($('#headrow2').html())
		expect($('#testrow2.1:visible').html()).to.equal(undefined);
		expect($('#testrow2.2:visible').html()).to.equal(undefined);
		expect($('#innerHeadRow:visible').html()).to.equal(undefined);//to.equal($('#innerHeadRow').html())
		expect($('#innerRow1:visible').html()).to.equal(undefined);//to.equal($('#innerRow1').html())
		expect($('#innerRow2:visible').html()).to.equal(undefined);//to.equal($('#innerRow2').html())
	});

	it('filter for existing value which is in the inner table (all rows should disappear, but inner table should be (theoreticaly) visible)', function () {

		filter('turtle')
		expect($('#headrow2:visible').html()).to.equal($('#headrow2').html())
		expect($('#testrow2.1:visible').html()).to.equal($('#testrow2.1').html())
		expect($('#testrow2.2:visible').html()).to.equal(undefined);
		expect($('#innerHeadRow:visible').html()).to.equal($('#innerHeadRow').html())
		expect($('#innerRow1:visible').html()).to.equal($('#innerRow1').html())
		expect($('#innerRow2:visible').html()).to.equal($('#innerRow2').html())
	});


});
