<?php

namespace craft\contentmigrations;

use Craft;
use craft\db\Migration;

/**
 * m180613_224016_test_migration migration.
 */
class m180613_224016_test_migration extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        // Place migration code here...
    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
        echo "m180613_224016_test_migration cannot be reverted.\n";
        return false;
    }
}
