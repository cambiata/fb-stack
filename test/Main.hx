package test;

import buddy.*;
using buddy.Should;

class Main implements Buddy<[Suite0]>{ }

class Suite0 extends BuddySuite {
    public function new() {
        describe('val', {
            var val = 1;
            it("should be 1", {
                val.should.be(1);
            });
        });
    }
}

