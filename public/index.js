const p_consts={
r_e:2.8179403227e-13,
pi:Math.PI,
n_a: 6.02214076e23,
e_rest_E:0.51099895000,
p_rest_E:938.27208816,
}
class Material {
  constructor(z,m_m,p,i) {
    this.z=z;
    this.m_m=m_m;
    this.p=p;
    this.i=i;
    this.atomic_density=this.get_atomic_p();
    this.electron_density=this.get_elec_p();
  }
  get_atomic_p(){
    return p_consts.n_a*this.p/this.m_m;
  }
  get_elec_p(){
  return p_consts.n_a*(this.z/this.m_m)*this.p;
  }
}

const materials={
z1:new Material(1.000,1.00784,8.37480E-05,19.200e-6),
z6:new Material(6.00,12.0107,2.00000,81.000e-6),
z7:new Material(7.00,14.0067,1.16528E-03,82e-6),
z8:new Material(8.00,15.999,1.33e-3,95.00e-6),
z11:new Material(11.00,22.989769,9.71e-1,149e-6),
z12:new Material(12.00,24.305,1.7400,156.00e-6),
z13:new Material(13,26.98,2.7,166e-6),
z14:new Material(14.00,28.0855,2.330,173.00e-6),
z18:new Material(18.000,39.948,1.66201e-3,188.000e-6),
z26:new Material(26.000,55.845,7.87400,286.00e-6),
z29:new Material(29.000,63.546,8.9600,322.00e-6),
z50:new Material(50.000,118.71,7.3100,488.000e-6),
z74:new Material(74.000,183.84,1.9300e1,727.000e-6),
z79:new Material(79.00,196.96657,1.9320e1,790.00e-6),
z82:new Material(82.00,208.000,1.12900e1,823.00e-6),
z92:new Material(92.000,238.02891,1.89500e1,890.00e-6)
}
//water
nw1=p_consts.n_a*1.0000*0.111894/1.00784
nw8=p_consts.n_a*1.000*0.888106/15.999
//concrete
nc1=p_consts.n_a*2.3000*0.010000/1.00784
nc6=p_consts.n_a*2.3000*0.0010000/12.0107
nc8=p_consts.n_a*2.3000*0.529107/15.999
nc11=p_consts.n_a*2.3000*0.016000/22.989769
nc12=p_consts.n_a*2.3000*0.002000/24.305
nc13=p_consts.n_a*2.3000*0.033872/26.981539
nc14=p_consts.n_a*2.3000*0.337021/28.0855
nc19=p_consts.n_a*2.3000*0.013000/39.0983
nc20=p_consts.n_a*2.3000*0.044000/40.078
nc26=p_consts.n_a*2.3000*0.01400/55.845
//air
nai6=p_consts.n_a*1.20479e-3*0.000124/12.0107
nai7=p_consts.n_a*1.20479e-3*0.755267/14.0067
nai8=p_consts.n_a*1.20479e-3*0.231781/15.999
nai18=p_consts.n_a*1.20479e-3*0.012827/39.948
//adipose
nad1=p_consts.n_a*9.2e-1*0.119477/1.00784
nad6=p_consts.n_a*9.2e-1*0.637240/12.0107
nad7=p_consts.n_a*9.2e-1*0.007970/15.0067
nad8=p_consts.n_a*9.2e-1*0.232333/15.999
nad11=p_consts.n_a*9.2e-1*0.000500/22.989769
nad12=p_consts.n_a*9.2e-1*0.000020/24.305
nad15=p_consts.n_a*9.2e-1*0.00016/30.973762
nad16=p_consts.n_a*9.2e-1*0.000730/32.065
nad17=p_consts.n_a*9.2e-1*0.001190/35.453
nad19=p_consts.n_a*9.2e-1*0.000320/39.0983
nad20=p_consts.n_a*9.2e-1*0.000020/40.078
nad26=p_consts.n_a*9.2e-1*0.000020/55.845
nad30=p_consts.n_a*9.2e-1*0.000020/65.38

const composite_ns={
water:[[nw1,nw8],[1.00704,15.999]],
concrete:[[nc1,nc6,nc8,nc11,nc12,nc13,nc14,nc19,nc20,nc26],[1.00784,12.0107,15.999,22.989769,24.305,26.981539,28.0855,39.0983,40.078,55.845]],
air:[[nai6,nai7,nai8,nai18],[12.0107,14.0067,15.99,39.948]],
adipose:[[nad1,nad6,nad7,nad8,nad11,nad12,nad15,nad16,nad17,nad19,nad20,nad26,nad30],[1.00784,12.0107,15.0067,15.999,22.989769,
24.305,30.973762,32.065,35.453,39.0983,40.078,55.845,65.38]],
}

function calculate_sigma(r_o,a_1,a_2){
return Math.PI*(r_o*(a_1**(1/3)+a_2**(1/3)))**2
}
function calculate_fraction(r_o,a_1,n_list,a_list,distance){
  var total_exp_term=0
for (j in n_list){
  total_exp_term+= n_list[j]*calculate_sigma(r_o,a_1,a_list[j])*distance;
}
return 1-Math.exp(-(total_exp_term))
}

const composite_material={
 water: new Material(55.5947,100,1,75e-6,55.5947),
 concrete: new Material(50.2803,100,2.30,135.2e-6,49),
 air: new Material(49.9365663562631,100,1.20479E-03,85.7e-6,49.936566),
 adipose: new Material(55.5947,100,9.2e-1,63.2e-6,45),
}

class Incident_Particle{
  constructor(z,e,n,t){
    this.t=t;
    this.z=z;
    this.e=e;
    this.n=n;
    this.rest_E=this.get_rest_E();
    this.beta_sq=this.get_beta_sq();
  }
  set_t(t){
  this.t=t;
  this.beta_sq=this.get_beta_sq();
  }
  get_t(){
  return this.t;
  }
  get_rest_E(){
  return this.z*938.272+this.n*939.5653297+this.e*0.510998950;
  }
  get_beta_sq(){
    var squared_term= (1/((this.t/this.rest_E)+1))**2;
    var beta_sq=1-squared_term;
    return beta_sq;
  }
}

function stopping_power(incident_particle,material){
var front_constant=  4*(incident_particle.z**2)*p_consts.pi*(p_consts.r_e**2)*((p_consts.e_rest_E)/incident_particle.beta_sq)*material.electron_density;
var log_term= Math.log(2*p_consts.e_rest_E*(incident_particle.beta_sq)/material.i);
return front_constant*log_term;
}

function range(incident_particle,material,delta_energy){
var init_particle_state= new Incident_Particle();
var fin_particle_state= new Incident_Particle();
var count=0;
Object.assign(init_particle_state,incident_particle);
Object.assign(fin_particle_state,incident_particle);
  var e_0=incident_particle.t;
var e_1=e_0-delta_energy;
  var total_distance=0.000;
  fin_particle_state.set_t(e_1)
  while(e_1>0){
    s_avg=(stopping_power(init_particle_state,material)+stopping_power(fin_particle_state,material))/2;
    total_distance+=(e_0-e_1)/(s_avg);
    e_0=fin_particle_state.get_t();
    e_1=fin_particle_state.get_t()-delta_energy;
    init_particle_state.set_t(e_0);
    fin_particle_state.set_t(e_1);
  }
  return total_distance;
}

function exit_energy(incident_particle,material,delta_energy,stopped_distance){
var init_particle_state= new Incident_Particle();
var fin_particle_state= new Incident_Particle();
var count=0;
Object.assign(init_particle_state,incident_particle);
Object.assign(fin_particle_state,incident_particle);
var initial_energy=incident_particle.t;
  var e_0=incident_particle.t;
var e_1=e_0-delta_energy;
  var total_distance=0.000;
  fin_particle_state.set_t(e_1)
  while(e_1>0 && total_distance<stopped_distance){
    s_avg=(stopping_power(init_particle_state,material)+stopping_power(fin_particle_state,material))/2;
    s_avg=stopping_power(fin_particle_state,material)
    total_distance+=(e_0-e_1)/(s_avg);
    e_0=fin_particle_state.get_t();
    e_1=fin_particle_state.get_t()-delta_energy;
    init_particle_state.set_t(e_0);
    fin_particle_state.set_t(e_1);
  }
  return [initial_energy-e_0,e_0];
}
function get_material_type(mat){
if(mat in materials){
  return materials[mat]
}
if(mat in composite_material){
  return composite_material[mat]
}
}


document.getElementById("btn_r").onclick = function(){range_clicked();}
document.getElementById("btn_sp").onclick = function(){stopping_power_clicked();}
document.getElementById("btn_e").onclick = function(){energy_clicked();}
document.getElementById("btn_f").onclick = function(){fraction_clicked();}
function stopping_power_clicked(){
var select_value=document.getElementById("select_sp").value
var z=document.getElementById("z_sp").value
var e= document.getElementById("e_sp").value
var n= document.getElementById("n_sp").value
var t=document.getElementById("t_sp").value
var material=get_material_type(select_value)
var stop_pow=stopping_power(new Incident_Particle(z,e,n,t),material)
console.log(stop_pow);
document.getElementById("p_sp").innerHTML=stop_pow
}
function range_clicked(){
var select_value=document.getElementById("select_r").value
var z=document.getElementById("z_r").value
var e= document.getElementById("e_r").value
var n= document.getElementById("n_r").value
var t=document.getElementById("t_r").value
var material=get_material_type(select_value)
var ran=range(new Incident_Particle(z,e,n,t),material,0.005)
document.getElementById("p_r").innerHTML=ran
}

function energy_clicked(){
var select_value=document.getElementById("select_e").value
var z=document.getElementById("z_e").value
var e= document.getElementById("e_e").value
var n= document.getElementById("n_e").value
var x=document.getElementById("x_e").value
var t=document.getElementById("t_e").value
var material=get_material_type(select_value)
var en=exit_energy(new Incident_Particle(z,e,n,t),material,0.005,x);
document.getElementById("p_e").innerHTML=en[0]+" deposited "+en[1]
}
function fraction_clicked(){
var select_value=document.getElementById("select_f").value
var z=document.getElementById("z_f").value
var e= document.getElementById("e_f").value
var n= document.getElementById("n_f").value
var t=document.getElementById("t_f").value
var x=document.getElementById("x_f").value
var r_o=document.getElementById("r_o_f").value
var fraction_value=0;
if(select_value in materials){
  fraction_value=calculate_fraction(r_o,parseFloat((new Incident_Particle(z,e,n,t)).z)+parseFloat((new Incident_Particle(z,e,n,t)).n),[materials[select_value].get_atomic_p()],[materials[select_value].m_m],x);
}
if(select_value in composite_ns){
  console.log(r_o,composite_ns[select_value][0],composite_ns[select_value][1],x)
  fraction_value=calculate_fraction(r_o,parseFloat((new Incident_Particle(z,e,n,t)).z)+parseFloat((new Incident_Particle(z,e,n,t)).n),composite_ns[select_value][0],composite_ns[select_value][1],x);
}
document.getElementById("p_f").innerHTML=fraction_value;
}


var array=[[new Incident_Particle(14,14,14,14000),new Material(13,26.98,2.7,166e-6)],
[ new Incident_Particle(1,0,0,25),composite_material.water],
[new Incident_Particle(6,6,6,1200),composite_material.concrete],
[new Incident_Particle(2,0,2,10),composite_material.air],
[new Incident_Particle(26,26,30,330*56),new Material(82,207.2,11.29,823e-6)]];
for (i in array){
  console.log(stopping_power(array[i][0],array[i][1]));
}
var array_q2=[[new Incident_Particle(1,0,0,45),composite_material.water],
[new Incident_Particle(6.0000,6.000,6.0000,600.000),
  new Material(82,207.2,11.35,823.0e-6)],
[new Incident_Particle(18.00,18.000,22.000,500*40),composite_material.concrete],
[new Incident_Particle(1,0,0,20),composite_material.air],
[new Incident_Particle(10,10,10,4000),
  new Material(13,26.98,2.7,166e-6)],
]
for (i in array_q2){
  console.log(range(array_q2[i][0],array_q2[i][1],0.005));
}

var array_q3a=[[new Incident_Particle(8,8,8,9600),new Material(13,26.98,2.7,166e-6),1],
[new Incident_Particle(1,0,0,500),new Material(82,207.2,11.29,823e-6),0.8]
]
for (i in array_q3a){
  var inc_part= array_q3a[i][0]
  var mat=array_q3a[i][1]
  console.log(exit_energy(array_q3a[i][0],array_q3a[i][1],0.003,array_q3a[i][2]))
//  console.log(calculate_fraction(1.4e-13,array_q3a[i][0].z+array_q3a[i][0].n,[array_q3a[i][1].get_atomic_p()],[array_q3a[i][1].m_m],array_q3a[i][2]))
  console.log(calculate_fraction(1.4e-13,array_q3a[i][0].z+array_q3a[i][0].n,[array_q3a[i][1].get_atomic_p()],[array_q3a[i][1].m_m],array_q3a[i][2]))
  console.log(calculate_fraction(1.2e-13,array_q3a[i][0].z+array_q3a[i][0].n,[array_q3a[i][1].get_atomic_p()],[array_q3a[i][1].m_m],array_q3a[i][2]))
}

var array_q3b=[[new Incident_Particle(7,7,7,6020),composite_ns.concrete,2,composite_material.concrete],
[new Incident_Particle(2,0,2,1040),composite_ns.water,4,composite_material.water],
[new Incident_Particle(1,0,0,800),composite_ns.air,100000,composite_material.air]]
for (i in array_q3b){
  console.log(exit_energy(array_q3b[i][0],array_q3b[i][3],0.003,array_q3b[i][2]));
  console.log(calculate_fraction(1.4e-13,array_q3b[i][0].z+array_q3b[i][0].n,array_q3b[i][1][0],array_q3b[i][1][1],array_q3b[i][2]));
  console.log(calculate_fraction(1.2e-13,array_q3b[i][0].z+array_q3b[i][0].n,array_q3b[i][1][0],array_q3b[i][1][1],array_q3b[i][2]));
}

console.log(stopping_power(new Incident_Particle(1,0,0,150),composite_material.adipose)/composite_material.adipose.p);
console.log(stopping_power(new Incident_Particle(6,6,6,340*12),composite_material.adipose)/composite_material.adipose.p);
console.log(range(new Incident_Particle(1.000,0.0000,0.000,200.000),composite_material.adipose,0.03)*composite_material.adipose.p)
console.log(range(new Incident_Particle(8.0,8.0,8.0,16*160),composite_material.adipose,0.05)*composite_material.adipose.p)
console.log(exit_energy(new Incident_Particle(1,0,0,250),composite_material.adipose,0.03,10));
console.log(exit_energy(new Incident_Particle(14,14,14,600*28),composite_material.adipose,0.03,10));
console.log(calculate_fraction(1.2e-13,(new Incident_Particle(1,0,0,333)).z+(new Incident_Particle(1,0,0,333)).n,composite_ns.adipose[0],composite_ns.adipose[1],5))
console.log(calculate_fraction(1.2e-13,(new Incident_Particle(2,2,2,333*4)).z+(new Incident_Particle(2,2,2,333*4)).n,composite_ns.adipose[0],composite_ns.adipose[1],5))
