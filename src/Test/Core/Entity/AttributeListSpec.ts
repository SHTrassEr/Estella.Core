﻿/// <reference path="../../Util/RandomGenerator.ts" />

QUnit.module("Core." + Estella.Core.AttributeListArray.name);



QUnit.test("all", function (assert) {
    let attributeList = new Estella.Core.AttributeListArray();
    let length = 40;

    let valueStrList = getRandomStringArray(length);
    let valueIntList = getRandomIntArray(length);

    for (let i = 0; i < length; i++) {
        attributeList.set(i, valueStrList[i]);
    }
    for (let i = 0; i < length; i++) {
        assert.strictEqual(attributeList.has(i), true);
        assert.strictEqual(attributeList.get(i), valueStrList[i]);
    }
    for (let i = 0; i < length; i++) {
        attributeList.set(i, valueIntList[i]);
    }
    for (let i = 0; i < length; i++) {
        assert.strictEqual(attributeList.has(i), true);
        assert.strictEqual(attributeList.get(i), valueIntList[i]);
    }

    for (let i = 0; i < length; i++) {
        attributeList.delete(i);
        assert.strictEqual(attributeList.has(i), false);
    }
});