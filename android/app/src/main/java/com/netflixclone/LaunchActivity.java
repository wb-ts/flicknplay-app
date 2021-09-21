package com.netflixclone;

import android.content.Intent;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

public class LaunchActivity extends AppCompatActivity {

        @Override
        public void onCreate(Bundle savedInstanceState){
            super.onCreate(savedInstanceState);

            Intent intent = new Intent(this, MainActivity.class);
            this.sendBroadcast(intent);
            startActivity(intent);

            finish();
        }
}
