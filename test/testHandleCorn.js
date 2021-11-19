const assert = require('assert');
const handleCorn = require('../service/cornhandler');

describe('cornhandler', function () {
    it('test handleCorn with happy path', function () {
        let expected = "minute: 0 15 30 45\nhour: 0\nday of month: 1 15\nmonth: 1 2 3 4 5 6 7 8 9 10 11 12\nday of week: 1 2 3 4 5\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("*/15 0 1,15 * 1-5 /usr/bin/find"), expected);
    });

    it('test handleCorn every min', function () {
        let expected = "minute: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59\nhour: 0\nday of month: 1 15\nmonth: 1 2 3 4 5 6 7 8 9 10 11 12\nday of week: 1 2 3 4 5\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("* 0 1,15 * 1-5 /usr/bin/find"), expected);
    });

    it('test handleCorn between every 5 start from 2', function () {
        let expected = "minute: 2 7 12 17 22 27 32 37 42 47 52 57\nhour: 0\nday of month: 1 15\nmonth: 1 2 3 4 5 6 7 8 9 10 11 12\nday of week: 1 2 3 4 5\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("2/5 0 1,15 * 1-5 /usr/bin/find"), expected);
    });

    it('test handleCorn with min from 0 to 15', function () {
        let expected = "minute: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15\nhour: 0\nday of month: 1 15\nmonth: 1 2 3 4 5 6 7 8 9 10 11 12\nday of week: 1 2 3 4 5\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("0-15 0 1,15 * 1-5 /usr/bin/find"), expected);
    });

    it('test handleCorn with min at 1, 5, 6, 9', function () {
        let expected = "minute: 1 5 6 9\nhour: 0\nday of month: 1 15\nmonth: 1 2 3 4 5 6 7 8 9 10 11 12\nday of week: 1 2 3 4 5\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("1,5,6,9 0 1,15 * 1-5 /usr/bin/find"), expected);
    });

    it('test handleCorn with min at 18', function () {
        let expected = "minute: 18\nhour: 0\nday of month: 1 15\nmonth: 1 2 3 4 5 6 7 8 9 10 11 12\nday of week: 1 2 3 4 5\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("18 0 1,15 * 1-5 /usr/bin/find"), expected);
    });

    it('test handleCorn with min over max', function () {
        let expected = "invalid minute '61'\nhour: 0\nday of month: 1 15\nmonth: 1 2 3 4 5 6 7 8 9 10 11 12\nday of week: 1 2 3 4 5\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("61 0 1,15 * 1-5 /usr/bin/find"), expected);
    });

    it('test handleCorn with min from 1 over max', function () {
        let expected = "invalid minute '60'\nhour: 0\nday of month: 1 15\nmonth: 1 2 3 4 5 6 7 8 9 10 11 12\nday of week: 1 2 3 4 5\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("1/60 0 1,15 * 1-5 /usr/bin/find"), expected);
    });

    it('test handleCorn with min between 1 over max', function () {
        let expected = "invalid minute '60'\nhour: 0\nday of month: 1 15\nmonth: 1 2 3 4 5 6 7 8 9 10 11 12\nday of week: 1 2 3 4 5\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("1-60 0 1,15 * 1-5 /usr/bin/find"), expected);
    });

    it('test handleCorn with every hour', function () {
        let expected = "minute: 0 15 30 45\nhour: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23\nday of month: 1 15\nmonth: 1 2 3 4 5 6 7 8 9 10 11 12\nday of week: 1 2 3 4 5\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("*/15 * 1,15 * 1-5 /usr/bin/find"), expected);
    });

    it('test handleCorn with hour between 1 to 5', function () {
        let expected = "minute: 0 15 30 45\nhour: 1 2 3 4 5\nday of month: 1 15\nmonth: 1 2 3 4 5 6 7 8 9 10 11 12\nday of week: 1 2 3 4 5\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("*/15 1-5 1,15 * 1-5 /usr/bin/find"), expected);
    });

    it('test handleCorn with hour from 1 each 5', function () {
        let expected = "minute: 0 15 30 45\nhour: 1 6 11 16 21\nday of month: 1 15\nmonth: 1 2 3 4 5 6 7 8 9 10 11 12\nday of week: 1 2 3 4 5\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("*/15 1/5 1,15 * 1-5 /usr/bin/find"), expected);
    });

    it('test handleCorn with hour in 1 3 5', function () {
        let expected = "minute: 0 15 30 45\nhour: 1 3 5\nday of month: 1 15\nmonth: 1 2 3 4 5 6 7 8 9 10 11 12\nday of week: 1 2 3 4 5\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("*/15 1,3,5 1,15 * 1-5 /usr/bin/find"), expected);
    });

    it('test handleCorn with hour over max', function () {
        let expected = "minute: 0 15 30 45\ninvalid hour '24'\nday of month: 1 15\nmonth: 1 2 3 4 5 6 7 8 9 10 11 12\nday of week: 1 2 3 4 5\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("*/15 24 1,15 * 1-5 /usr/bin/find"), expected);
    });

    it('test handleCorn with hour at 23', function () {
        let expected = "minute: 0 15 30 45\nhour: 23\nday of month: 1 15\nmonth: 1 2 3 4 5 6 7 8 9 10 11 12\nday of week: 1 2 3 4 5\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("*/15 23 1,15 * 1-5 /usr/bin/find"), expected);
    });

    it('test handleCorn with month between 1 to 3', function () {
        let expected = "minute: 0 15 30 45\nhour: 23\nday of month: 1 15\nmonth: 1 2 3\nday of week: 1 2 3 4 5\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("*/15 23 1,15 1-3 1-5 /usr/bin/find"), expected);
    });

    it('test handleCorn with month from 1 every 3', function () {
        let expected = "minute: 0 15 30 45\nhour: 23\nday of month: 1 15\nmonth: 1 4 7 10\nday of week: 1 2 3 4 5\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("*/15 23 1,15 1/3 1-5 /usr/bin/find"), expected);
    });

    it('test handleCorn with month at 2, 4, 5', function () {
        let expected = "minute: 0 15 30 45\nhour: 23\nday of month: 1 15\nmonth: 2 4 5\nday of week: 1 2 3 4 5\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("*/15 23 1,15 2,4,5 1-5 /usr/bin/find"), expected);
    });

    it('test handleCorn with month over max', function () {
        let expected = "minute: 0 15 30 45\nhour: 23\nday of month: 1 15\ninvalid month '13'\nday of week: 1 2 3 4 5\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("*/15 23 1,15 13 1-5 /usr/bin/find"), expected);
    });

    it('test handleCorn with day at 31', function () {
        let expected = "minute: 0 15 30 45\nhour: 23\nday of month: 31\nmonth: 1 2 3 4 5 6 7 8 9 10 11 12\nday of week: 1 2 3 4 5\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("*/15 23 31 * 1-5 /usr/bin/find"), expected);
    });

    it('test handleCorn with day over max', function () {
        let expected = "minute: 0 15 30 45\nhour: 23\ninvalid day of month '32'\nmonth: 1 2 3 4 5 6 7 8 9 10 11 12\nday of week: 1 2 3 4 5\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("*/15 23 32 * 1-5 /usr/bin/find"), expected);
    });

    it('test handleCorn with week 7', function () {
        let expected = "minute: 0 15 30 45\nhour: 23\ninvalid day of month '32'\nmonth: 1 2 3 4 5 6 7 8 9 10 11 12\nday of week: 7\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("*/15 23 32 * 7 /usr/bin/find"), expected);
    });

    it('test handleCorn with week over max', function () {
        let expected = "minute: 0 15 30 45\nhour: 23\ninvalid day of month '32'\nmonth: 1 2 3 4 5 6 7 8 9 10 11 12\ninvalid day of week '8'\ncommand: /usr/bin/find\n";
        assert.strictEqual(handleCorn("*/15 23 32 * 8 /usr/bin/find"), expected);
    });

    it('test handleCorn with invalid input', function () {
        assert.strictEqual(handleCorn("*/15 0 1,15 * 1-5/usr/bin/find"), "Input param '*/15 0 1,15 * 1-5/usr/bin/find' invalid");
    });
});