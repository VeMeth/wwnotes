<script>
    export let checked = false;
    export let color = "#2196F3";
  </script>
  
  <style>
    .switch {
      position: relative;
      display: inline-block;
      width: 54px;
      height: 28px;
    }
  
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 30px;
    }
  
    .slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 50%;
    }
  
    input:checked + .slider {
      background-color: #ff3e00;
    }
  
    input:checked + .slider {
      box-shadow: 0 0 1px #ff3e00;
    }
  
    input:checked + .slider:before {
      -webkit-transform: translateX(20px);
      -ms-transform: translateX(20px);
      transform: translateX(20px);
    }
  </style>
  
  <label class="switch">
    <input type="checkbox" bind:checked />
    <span class="slider" />
  </label>