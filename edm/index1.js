const math = Math; // Import math library

function calculateParameters(){
  const kvaValue = document.getElementById("kva_value");
  const v1Value = document.getElementById("v1");
  const v2Value = document.getElementById("v2_value");
  const vocValue = document.getElementById("voc_value");
  const iocValue = document.getElementById("Ioc_value");
  const pocValue = document.getElementById("Poc_value");
  const vscValue = document.getElementById("vsc_value");
  const iscValue = document.getElementById("Isc_value");
  const pscValue = document.getElementById("Psc_value");
  const pfValue = document.getElementById("Pf_value");
  const lpValue = document.getElementById("Lp_value");

  const S = parseFloat(kvaValue.value) * 1000;
  const V1 = parseFloat(v1Value.value);
  const V2 = parseFloat(v2Value.value);
  const Voc = parseFloat(vocValue.value);
  const Ioc = parseFloat(iocValue.value);
  const Poc = parseFloat(pocValue.value);
  const Vsc = parseFloat(vscValue.value);
  const Isc = parseFloat(iscValue.value);
  const Psc = parseFloat(pscValue.value);
  const pf = parseFloat(pfValue.value);
  const lp = parseFloat(lpValue.value) /100;
  
  let a = V1/V2;
  let Rc = Math.pow(a, 2) * ((Math.pow(Voc, 2)) / Poc);
  let Xm = Math.pow(a, 2) * (Voc / Math.sqrt(Math.pow(Ioc, 2) - Math.pow((Voc / (Rc / Math.pow(a, 2))), 2)));
  let Re1 = Psc / Math.pow(Isc, 2);
  let Xe1 = Math.sqrt(Math.pow((Vsc / Isc), 2) - Math.pow(Re1, 2));

  console.log("1a");
  console.log("Rc (in kOhms):", Math.round(Rc / 1000, 4));
  console.log("Xm (in kOhms):", Math.round(Xm / 1000, 4));
  console.log("Re1 (in Ohms):", Math.round(Re1, 4));
  console.log("Xe1 (in Ohms):", Math.round(Xe1, 4));

  //Voltage Regulation
  let I1 = S / V2 / a;
  let pa = Math.acos(pf) * -1;
  let I1_complex = {
    real: I1 * Math.cos(pa),
    imag: I1 * Math.sin(pa)
  };
  let c = {
    real: Re1,
    imag: Xe1
  };
  let V_1 = {
    real: (a * V2) + (I1_complex.real * c.real - I1_complex.imag * c.imag),
    imag: (I1_complex.real * c.imag + I1_complex.imag * c.real)
  };
  let V_1_mag = Math.sqrt(Math.pow(V_1.real, 2) + Math.pow(V_1.imag, 2));
  let VR = ((V_1_mag - (a * V2)) / (a * V2)) * 100;

  console.log("\n1b");
  console.log("VR (in %):", Math.round(VR, 4));

  //c
  let n = (pf * lp * S) / ((pf * lp * S) + Poc + (Psc * Math.pow(lp, 2))) * 100;
  console.log("\n1c\nn (in %):", Math.round(n, 4));

  //d
  let kVAMax = S * Math.sqrt(Poc / Psc);
  console.log("\n1d\nkVAMax (in kVa):", Math.round(kVAMax / 1000, 4));

  //e
  let nmax = ((kVAMax * pf) / (kVAMax * pf + 2 * Poc)) * 100;
  console.log("\n1e\nnmax (in %):", Math.round(nmax, 4));

  // To display results in html div
  const resultsDiv = document.getElementById("results");
  //return results to html
  resultsDiv.innerHTML = `
  <h2>Results</h2>
  <h2>1a</h2>
  <p>Rc (in kOhms): ${Math.round(Rc / 1000, 4)}</p>
  <p>Xm (in kOhms): ${Math.round(Xm / 1000, 4)}</p>
  <p>Re1 (in Ohms): ${Math.round(Re1 , 4)}</p>
  <p>Xe1 (in Ohms): ${Math.round(Xe1 , 4)}</p>

  <h2>1b</h2>
  <p>VR (in %): ${Math.round(VR, 4)}</p>

  <h2>1c</h2>
  <p>Efficiency (in %): ${Math.round(n, 4)}</p>

  <h2>1d</h2>
  <p>kvaMAX (in kVA): ${Math.round(kVAMax / 1000, 4)}</p>

  <h2>1e</h2>
  <p>Max Efficiency (in %): ${Math.round(nmax, 4)}</p>
  `
}

function calculateParameters2() {
  const kvaValue2 = document.getElementById("kva_value2");
  const eff2 = document.getElementById("eff_value2");
  const pfValue2 = document.getElementById("Pf_value2");
  const lmaxvalue2 = document.getElementById("lmax_value2");

  const S = parseFloat(kvaValue2.value) * 1000;
  const n = parseFloat(eff2.value) / 100;
  const pf = parseFloat(pfValue2.value);
  const l_max = parseFloat(lmaxvalue2.value) /100; 

  let Pcufl = ((1 - n) * pf * S) / (n * (1 + Math.pow(l_max, 2)));
  let Pi = Pcufl * Math.pow(l_max, 2);
  let nmax = ((pf * l_max * S) / ((pf * l_max * S) + (2 * Pi))) * 100;

  console.log("Q2");
  console.log("Pi (in W):", Math.round(Pi, 4));
  console.log("Pcufl (in W):", Math.round(Pcufl, 4));
  console.log("nmax (in %):", Math.round(nmax, 4));

  // To display results in html div
  const resultsDiv = document.getElementById("results2");
  //return results to html
  resultsDiv.innerHTML = `
  <h2>Results</h2>
  <h2>Q2</h2>
  <p>Pi (in W): ${Math.round(Pi, 4)}</p>
  <p>Pcufl (in W): ${Math.round(Pcufl, 4)}</p>
  <p>nmax (in %): ${Math.round(nmax, 4)}</p>
  `
}